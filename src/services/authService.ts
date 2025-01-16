import { supabase } from '@/lib/supabase';
import { errorHandler } from './errorHandling';

class AuthService {
  private refreshPromise: Promise<string | null> | null = null;

  async getAccessToken(): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      errorHandler.handle(error, 'getAccessToken');
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw error;
        return data.session?.access_token || null;
      } catch (error) {
        errorHandler.handle(error, 'refreshToken');
        return null;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        return await operation();
      } catch (error: any) {
        if (error?.statusCode === 401 && retries < maxRetries - 1) {
          await this.refreshToken();
          retries++;
          continue;
        }
        throw error;
      }
    }
    
    throw new Error('Max retries exceeded');
  }
}

export const authService = new AuthService();
