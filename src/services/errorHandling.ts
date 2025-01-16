import { toast } from '@/components/ui/use-toast';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public retryable: boolean = true
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public retryable: boolean = true
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class RateLimitError extends ApiError {
  constructor(
    message: string,
    public retryAfter?: number
  ) {
    super(message, 429, 'RATE_LIMIT', true);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class CampaignError extends Error {
  constructor(
    message: string,
    public campaignId: string,
    public errorCode: string
  ) {
    super(message);
    this.name = 'CampaignError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class FileUploadError extends Error {
  constructor(
    message: string,
    public fileType?: string,
    public fileSize?: number
  ) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export class SessionError extends Error {
  constructor(message: string = 'Session expired') {
    super(message);
    this.name = 'SessionError';
  }
}

export interface ErrorMetadata {
  [key: string]: string | number | boolean | null | undefined;
}

export interface ErrorLogEntry {
  timestamp: Date;
  error: Error;
  context: string;
  userId?: string;
  sessionId?: string;
  browserInfo?: {
    userAgent: string;
    platform: string;
    language: string;
  };
  stackTrace?: string;
  metadata?: ErrorMetadata;
}

export interface RetryableOperation<T> {
  (): Promise<T>;
}

class ErrorHandlingService {
  private errorLog: ErrorLogEntry[] = [];
  private readonly MAX_LOG_SIZE = 1000;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // ms

  async handle(error: unknown, context: string, metadata?: ErrorMetadata): Promise<void> {
    console.error(`Error in ${context}:`, error);
    
    const errorEntry = await this.createErrorLogEntry(error as Error, context, metadata);
    this.logError(errorEntry);

    if (this.isCriticalError(error as Error)) {
      await this.notifyMonitoring(errorEntry);
    }

    // Handle specific error types
    if (error instanceof ValidationError) {
      this.handleValidationError(error);
    } else if (error instanceof RateLimitError) {
      this.handleRateLimitError(error);
    } else if (error instanceof SessionError) {
      await this.handleSessionError(error);
    } else if (error instanceof NetworkError) {
      await this.handleNetworkError(error);
    } else if (error instanceof FileUploadError) {
      this.handleFileUploadError(error);
    } else if (error instanceof ApiError) {
      await this.handleApiError(error);
    } else {
      this.handleUnknownError(error as Error);
    }
  }

  private async createErrorLogEntry(error: Error, context: string, metadata?: ErrorMetadata): Promise<ErrorLogEntry> {
    return {
      timestamp: new Date(),
      error,
      context,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      browserInfo: this.getBrowserInfo(),
      stackTrace: error.stack,
      metadata
    };
  }

  private handleValidationError(error: ValidationError) {
    Object.entries(error.fields).forEach(([field, errors]) => {
      errors.forEach(errorMsg => {
        toast({
          title: `Validation Error: ${field}`,
          description: errorMsg,
          variant: "destructive"
        });
      });
    });
  }

  private async handleSessionError(error: SessionError) {
    toast({
      title: "Session Expired",
      description: "Please login again to continue",
      variant: "destructive"
    });
    
    try {
      await this.refreshSession();
    } catch {
      window.location.href = '/login';
    }
  }

  private async handleNetworkError(error: NetworkError) {
    if (error.retryable) {
      await this.retryWithBackoff(async () => {
        // Retry the failed request
        // Implementation depends on your request handling
      });
    }

    toast({
      title: "Network Error",
      description: "Please check your internet connection",
      variant: "destructive"
    });
  }

  private handleFileUploadError(error: FileUploadError) {
    toast({
      title: "File Upload Error",
      description: error.message,
      variant: "destructive"
    });
  }

  private async handleApiError(error: ApiError) {
    if (error.retryable) {
      await this.retryWithBackoff(async () => {
        // Retry the failed API call
        // Implementation depends on your API service
      });
    }

    switch (error.statusCode) {
      case 401:
        await this.handleUnauthorized();
        break;
      case 403:
        this.handleForbidden();
        break;
      case 429:
        await this.handleRateLimit(error as RateLimitError);
        break;
      default:
        this.handleGenericApiError(error);
    }
  }

  private async retryWithBackoff<T>(operation: RetryableOperation<T>): Promise<T> {
    let retries = 0;
    while (retries < this.MAX_RETRIES) {
      try {
        return await operation();
      } catch (error) {
        retries++;
        if (retries === this.MAX_RETRIES) throw error;
        await this.delay(this.RETRY_DELAY * Math.pow(2, retries));
      }
    }
    throw new Error('Maximum retries exceeded');
  }

  private async refreshSession() {
    // Implement session refresh logic
    // This should integrate with your auth service
  }

  private getBrowserInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    };
  }

  private getSessionId(): string {
    // Implement session ID retrieval
    return 'session-id'; // Replace with actual implementation
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private logError(errorEntry: ErrorLogEntry) {
    this.errorLog.unshift(errorEntry);
    
    // Keep log size manageable
    if (this.errorLog.length > this.MAX_LOG_SIZE) {
      this.errorLog = this.errorLog.slice(0, this.MAX_LOG_SIZE);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Implementation depends on your auth system
    return undefined;
  }

  private isCriticalError(error: Error): boolean {
    return error instanceof ApiError && (error.statusCode === 500 || error.statusCode === 503);
  }

  private async notifyMonitoring(logEntry: ErrorLogEntry) {
    // Implementation for your monitoring service
    console.error('Critical error:', logEntry);
  }

  private handleRateLimitError(error: RateLimitError) {
    toast({
      title: "Rate Limit Exceeded",
      description: `Please wait ${error.retryAfter} seconds before trying again.`,
      variant: "destructive"
    });
  }

  private handleUnknownError(error: Error) {
    toast({
      title: "Error",
      description: "An unexpected error occurred",
      variant: "destructive"
    });
  }

  private handleUnauthorized() {
    toast({
      title: "Authentication Error",
      description: "Please login again to continue.",
      variant: "destructive"
    });
    // Redirect to login
    window.location.href = '/login';
  }

  private handleForbidden() {
    toast({
      title: "Permission Denied",
      description: "You don't have permission to perform this action.",
      variant: "destructive"
    });
  }

  private async handleRateLimit(error: RateLimitError) {
    toast({
      title: "Rate Limited",
      description: "Too many requests. Please try again later.",
      variant: "destructive"
    });
  }

  private handleGenericApiError(error: ApiError) {
    toast({
      title: "Error",
      description: error.message || "An unexpected error occurred",
      variant: "destructive"
    });
  }

  getErrorLog(): ErrorLogEntry[] {
    return this.errorLog;
  }

  clearErrorLog() {
    this.errorLog = [];
  }
}

export const errorHandler = new ErrorHandlingService();
