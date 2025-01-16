import { supabase } from '@/lib/supabase';
import { errorHandler, SessionError } from './errorHandling';

interface SessionData {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export class SessionService {
  private static instance: SessionService;
  private currentSession: SessionData | null = null;
  private refreshPromise: Promise<void> | null = null;
  private readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    // Initialize session check interval
    setInterval(() => this.checkSession(), 60000); // Check every minute
  }

  static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  async initialize(): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        this.currentSession = {
          userId: session.user.id,
          token: session.access_token,
          refreshToken: session.refresh_token,
          expiresAt: this.getExpirationTime(session.access_token)
        };
      }
    } catch (error) {
      errorHandler.handle(error, 'sessionInitialization');
    }
  }

  async getValidSession(): Promise<SessionData> {
    if (!this.currentSession) {
      throw new SessionError('No active session');
    }

    // Check if session needs refresh
    if (this.needsRefresh()) {
      await this.refreshSession();
    }

    return this.currentSession;
  }

  async refreshSession(): Promise<void> {
    // If already refreshing, wait for that to complete
    if (this.refreshPromise) {
      await this.refreshPromise;
      return;
    }

    try {
      this.refreshPromise = this.performRefresh();
      await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<void> {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }

      if (!session) {
        throw new SessionError('Failed to refresh session');
      }

      this.currentSession = {
        userId: session.user.id,
        token: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: this.getExpirationTime(session.access_token)
      };
    } catch (error) {
      errorHandler.handle(error, 'sessionRefresh');
      throw error;
    }
  }

  private needsRefresh(): boolean {
    if (!this.currentSession) return false;

    const now = Date.now();
    return this.currentSession.expiresAt - now < this.TOKEN_REFRESH_THRESHOLD;
  }

  private async checkSession(): Promise<void> {
    try {
      if (this.currentSession && this.needsRefresh()) {
        await this.refreshSession();
      }
    } catch (error) {
      errorHandler.handle(error, 'sessionCheck');
    }
  }

  private getExpirationTime(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch {
      return Date.now() + 3600 * 1000; // Default to 1 hour from now
    }
  }

  async endSession(): Promise<void> {
    try {
      await supabase.auth.signOut();
      this.currentSession = null;
    } catch (error) {
      errorHandler.handle(error, 'sessionEnd');
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentSession && !this.needsRefresh();
  }

  getCurrentUserId(): string | null {
    return this.currentSession?.userId || null;
  }

  getAccessToken(): string | null {
    return this.currentSession?.token || null;
  }
}

export const sessionService = SessionService.getInstance();
