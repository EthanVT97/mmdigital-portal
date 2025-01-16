import { errorHandler, ApiError, NetworkError, TimeoutError } from './errorHandling';

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  validateResponse?: (response: Response) => Promise<boolean>;
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
}

interface RequestData {
  [key: string]: string | number | boolean | null | undefined | RequestData | Array<string | number | boolean | null | undefined | RequestData>;
}

class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private isOpen: boolean = false;

  constructor(private config: CircuitBreakerConfig) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.isOpen) {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime;
      if (timeSinceLastFailure >= this.config.resetTimeout) {
        this.reset();
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await operation();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private reset(): void {
    this.failures = 0;
    this.isOpen = false;
  }

  private recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.config.failureThreshold) {
      this.isOpen = true;
    }
  }
}

export class ApiRequestService {
  private static instance: ApiRequestService;
  private circuitBreaker: CircuitBreaker;

  private constructor() {
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 5,
      resetTimeout: 60000 // 1 minute
    });
  }

  static getInstance(): ApiRequestService {
    if (!ApiRequestService.instance) {
      ApiRequestService.instance = new ApiRequestService();
    }
    return ApiRequestService.instance;
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const {
      timeout = 30000,
      retries = 3,
      retryDelay = 1000,
      validateResponse,
      ...fetchOptions
    } = options;

    return this.circuitBreaker.execute(async () => {
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            await this.delay(retryDelay * Math.pow(2, attempt - 1));
          }

          const response = await this.timeoutFetch(url, timeout, fetchOptions);

          // Validate response if custom validation is provided
          if (validateResponse) {
            const isValid = await validateResponse(response);
            if (!isValid) {
              throw new ApiError('Response validation failed', response.status);
            }
          }

          // Handle different response status codes
          if (!response.ok) {
            throw new ApiError(
              `Request failed with status ${response.status}`,
              response.status,
              await this.getErrorCode(response),
              this.isRetryable(response.status)
            );
          }

          return await response.json();
        } catch (error) {
          lastError = this.handleRequestError(error);

          // If the error is not retryable or we're out of retries, throw it
          if (!this.isRetryableError(lastError) || attempt === retries) {
            throw lastError;
          }
        }
      }

      throw lastError;
    });
  }

  private async timeoutFetch(
    url: string,
    timeout: number,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new TimeoutError(`Request timed out after ${timeout}ms`);
      }
      throw error;
    }
  }

  private async getErrorCode(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.code || 'UNKNOWN_ERROR';
    } catch {
      return 'UNKNOWN_ERROR';
    }
  }

  private handleRequestError(error: unknown): Error {
    if (error instanceof ApiError || error instanceof TimeoutError) {
      return error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return new TimeoutError();
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return new NetworkError('Network connection failed', true);
    }

    return new Error('Unknown error occurred');
  }

  private isRetryableError(error: Error): boolean {
    if (error instanceof ApiError) {
      return error.retryable;
    }

    if (error instanceof NetworkError) {
      return error.retryable;
    }

    if (error instanceof TimeoutError) {
      return true;
    }

    return false;
  }

  private isRetryable(statusCode: number): boolean {
    // 5xx errors and some 4xx errors are retryable
    return (
      statusCode >= 500 ||
      statusCode === 429 ||
      statusCode === 408 ||
      statusCode === 423
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper method to create common request options
  createRequestOptions(
    method: string,
    data?: RequestData,
    additionalOptions: Partial<RequestOptions> = {}
  ): RequestOptions {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...additionalOptions.headers
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
      ...additionalOptions
    };
  }
}

export const apiRequestService = ApiRequestService.getInstance();
