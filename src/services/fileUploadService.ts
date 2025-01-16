import { errorHandler, FileUploadError } from './errorHandling';

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  maxWidth?: number; // for images
  maxHeight?: number; // for images
  minWidth?: number; // for images
  minHeight?: number; // for images
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class FileUploadService {
  private readonly DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly DEFAULT_ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  async validateFile(file: File, options: FileValidationOptions = {}): Promise<void> {
    // Check file size
    const maxSize = options.maxSize || this.DEFAULT_MAX_SIZE;
    if (file.size > maxSize) {
      throw new FileUploadError(
        `File size exceeds maximum limit of ${maxSize / 1024 / 1024}MB`,
        file.type,
        file.size
      );
    }

    // Check file type
    const allowedTypes = options.allowedTypes || this.DEFAULT_ALLOWED_TYPES;
    if (!allowedTypes.includes(file.type)) {
      throw new FileUploadError(
        `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
        file.type,
        file.size
      );
    }

    // For images, check dimensions
    if (file.type.startsWith('image/') && (options.maxWidth || options.maxHeight || options.minWidth || options.minHeight)) {
      await this.validateImageDimensions(file, options);
    }
  }

  private async validateImageDimensions(file: File, options: FileValidationOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        if (options.maxWidth && img.width > options.maxWidth) {
          reject(new FileUploadError(`Image width ${img.width}px exceeds maximum of ${options.maxWidth}px`));
        }
        if (options.maxHeight && img.height > options.maxHeight) {
          reject(new FileUploadError(`Image height ${img.height}px exceeds maximum of ${options.maxHeight}px`));
        }
        if (options.minWidth && img.width < options.minWidth) {
          reject(new FileUploadError(`Image width ${img.width}px is below minimum of ${options.minWidth}px`));
        }
        if (options.minHeight && img.height < options.minHeight) {
          reject(new FileUploadError(`Image height ${img.height}px is below minimum of ${options.minHeight}px`));
        }

        resolve();
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new FileUploadError('Failed to load image for dimension validation'));
      };

      img.src = url;
    });
  }

  async uploadFile(
    file: File,
    url: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    try {
      // Validate file before upload
      await this.validateFile(file);

      const formData = new FormData();
      formData.append('file', file);

      // Use XMLHttpRequest for upload progress support
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (onProgress && event.lengthComputable) {
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded * 100) / event.total)
            });
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response.fileUrl);
            } catch {
              reject(new FileUploadError('Invalid response format'));
            }
          } else {
            reject(new FileUploadError(`Upload failed with status: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new FileUploadError('Network error during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new FileUploadError('Upload aborted'));
        });

        xhr.open('POST', url);
        // Add any required headers here
        xhr.send(formData);
      });

    } catch (error) {
      errorHandler.handle(error, 'fileUpload');
      throw error;
    }
  }

  async uploadMultipleFiles(
    files: File[],
    url: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, url, onProgress));
    return Promise.all(uploadPromises);
  }

  // Helper method to format bytes to human-readable size
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }
}

export const fileUploadService = new FileUploadService();
