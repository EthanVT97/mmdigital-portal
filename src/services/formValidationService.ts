import { ValidationError } from './errorHandling';
import { z } from 'zod';

export type ValidationValue = string | number | boolean | null | undefined;

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom';
  value?: number | string; // Restricted to number or string for comparisons
  message?: string;
  validator?: (value: ValidationValue) => boolean | Promise<boolean>;
}

export interface FormData {
  [key: string]: ValidationValue;
}

export interface FieldValidation {
  [key: string]: ValidationRule[];
}

export class FormValidationService {
  private static instance: FormValidationService;
  private submissionCache: Map<string, { timestamp: number; count: number }> = new Map();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly MAX_SUBMISSIONS = 5; // Max submissions per minute

  private constructor() {}

  static getInstance(): FormValidationService {
    if (!FormValidationService.instance) {
      FormValidationService.instance = new FormValidationService();
    }
    return FormValidationService.instance;
  }

  async validateForm(data: FormData, rules: FieldValidation): Promise<void> {
    const errors: Record<string, string[]> = {};

    // Check for rate limiting
    if (this.isRateLimited('form-submission')) {
      throw new ValidationError('Too many form submissions. Please try again later.', {
        form: ['Rate limit exceeded']
      });
    }

    // Validate each field
    for (const [field, fieldRules] of Object.entries(rules)) {
      const fieldErrors: string[] = [];
      const value = data[field];

      for (const rule of fieldRules) {
        const error = await this.validateField(value, rule);
        if (error) {
          fieldErrors.push(error);
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    // If there are any errors, throw a ValidationError
    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Form validation failed', errors);
    }

    // Update rate limiting counter
    this.updateRateLimit('form-submission');
  }

  private async validateField(value: ValidationValue, rule: ValidationRule): Promise<string | null> {
    switch (rule.type) {
      case 'required':
        if (value === undefined || value === null || value === '') {
          return rule.message || 'This field is required';
        }
        break;

      case 'email':
        if (typeof value === 'string' && value && !this.isValidEmail(value)) {
          return rule.message || 'Invalid email address';
        }
        break;

      case 'min':
        if (typeof value === 'string' && typeof rule.value === 'number' && value.length < rule.value) {
          return rule.message || `Minimum length is ${rule.value} characters`;
        } else if (typeof value === 'number' && typeof rule.value === 'number' && value < rule.value) {
          return rule.message || `Minimum value is ${rule.value}`;
        }
        break;

      case 'max':
        if (typeof value === 'string' && typeof rule.value === 'number' && value.length > rule.value) {
          return rule.message || `Maximum length is ${rule.value} characters`;
        } else if (typeof value === 'number' && typeof rule.value === 'number' && value > rule.value) {
          return rule.message || `Maximum value is ${rule.value}`;
        }
        break;

      case 'pattern':
        if (typeof value === 'string' && typeof rule.value === 'string' && !new RegExp(rule.value).test(value)) {
          return rule.message || 'Invalid format';
        }
        break;

      case 'custom':
        if (rule.validator) {
          const isValid = await Promise.resolve(rule.validator(value));
          if (!isValid) {
            return rule.message || 'Validation failed';
          }
        }
        break;
    }

    return null;
  }

  private isValidEmail(email: string): boolean {
    return z.string().email().safeParse(email).success;
  }

  private isRateLimited(key: string): boolean {
    const now = Date.now();
    const submission = this.submissionCache.get(key);

    if (!submission) {
      return false;
    }

    return (
      now - submission.timestamp < this.RATE_LIMIT_WINDOW &&
      submission.count >= this.MAX_SUBMISSIONS
    );
  }

  private updateRateLimit(key: string): void {
    const now = Date.now();
    const submission = this.submissionCache.get(key);

    if (!submission || now - submission.timestamp >= this.RATE_LIMIT_WINDOW) {
      this.submissionCache.set(key, { timestamp: now, count: 1 });
    } else {
      submission.count++;
    }
  }

  // Sanitize input to prevent XSS
  sanitizeInput(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Helper method to create common validation rules
  createRules(type: string): ValidationRule[] {
    switch (type) {
      case 'email':
        return [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' }
        ];

      case 'password':
        return [
          { type: 'required', message: 'Password is required' },
          { type: 'min', value: 8, message: 'Password must be at least 8 characters' },
          {
            type: 'pattern',
            value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
            message: 'Password must include uppercase, lowercase, number and special character'
          }
        ];

      case 'phone':
        return [
          { type: 'pattern', value: '^\\+?[1-9]\\d{1,14}$', message: 'Invalid phone number' }
        ];

      default:
        return [];
    }
  }
}

export const formValidationService = FormValidationService.getInstance();
