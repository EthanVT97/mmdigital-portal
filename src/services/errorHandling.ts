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

interface ErrorLogEntry {
  timestamp: Date;
  error: Error;
  context: string;
  userId?: string;
}

class ErrorHandlingService {
  private errorLog: ErrorLogEntry[] = [];
  private readonly MAX_LOG_SIZE = 1000;

  handle = (error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error);
    
    this.logError(error as Error, context);

    if (error instanceof ValidationError) {
      Object.entries(error.fields).forEach(([field, errors]) => {
        errors.forEach(errorMsg => {
          toast({
            title: `Validation Error: ${field}`,
            description: errorMsg,
            variant: "destructive"
          });
        });
      });
      return;
    }

    if (error instanceof RateLimitError) {
      toast({
        title: "Rate Limit Exceeded",
        description: `Please wait ${error.retryAfter} seconds before trying again.`,
        variant: "destructive"
      });
      return;
    }

    if (error instanceof CampaignError) {
      toast({
        title: "Campaign Error",
        description: `Error with campaign ${error.campaignId}: ${error.message}`,
        variant: "destructive"
      });
      return;
    }

    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 401:
          toast({
            title: "Authentication Error",
            description: "Please login again to continue.",
            variant: "destructive"
          });
          // Redirect to login
          window.location.href = '/login';
          break;
        case 403:
          toast({
            title: "Permission Denied",
            description: "You don't have permission to perform this action.",
            variant: "destructive"
          });
          break;
        case 429:
          toast({
            title: "Rate Limited",
            description: "Too many requests. Please try again later.",
            variant: "destructive"
          });
          break;
        default:
          toast({
            title: "Error",
            description: error.message || "An unexpected error occurred",
            variant: "destructive"
          });
      }
    } else if (error instanceof NetworkError) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  private logError(error: Error, context: string) {
    const logEntry: ErrorLogEntry = {
      timestamp: new Date(),
      error,
      context,
      userId: this.getCurrentUserId()
    };

    this.errorLog.unshift(logEntry);
    
    // Keep log size manageable
    if (this.errorLog.length > this.MAX_LOG_SIZE) {
      this.errorLog = this.errorLog.slice(0, this.MAX_LOG_SIZE);
    }

    // Send to monitoring service if critical
    if (this.isCriticalError(error)) {
      this.notifyMonitoring(logEntry);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Implementation depends on your auth system
    return undefined;
  }

  private isCriticalError(error: Error): boolean {
    return error instanceof ApiError && (error.statusCode === 500 || error.statusCode === 503);
  }

  private notifyMonitoring(logEntry: ErrorLogEntry) {
    // Implementation for your monitoring service
    console.error('Critical error:', logEntry);
  }

  getErrorLog(): ErrorLogEntry[] {
    return this.errorLog;
  }

  clearErrorLog() {
    this.errorLog = [];
  }
}

export const errorHandler = new ErrorHandlingService();
