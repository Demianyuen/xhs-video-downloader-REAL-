/**
 * Final Polish Utilities
 * Error handling, loading states, and UX improvements
 */

export interface ErrorState {
  code: string;
  message: string;
  details?: string;
  recoveryAction?: string;
}

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

/**
 * Error messages
 */
export const errorMessages = {
  INVALID_URL: {
    code: 'INVALID_URL',
    message: 'Invalid XHS URL',
    details: 'Please paste a valid Xiaohongshu video URL',
    recoveryAction: 'Try copying the URL again from the XHS app',
  },
  DOWNLOAD_FAILED: {
    code: 'DOWNLOAD_FAILED',
    message: 'Download failed',
    details: 'Unable to download the video. Please try again.',
    recoveryAction: 'Refresh the page and try again',
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Download limit reached',
    details: 'You have reached your daily download limit',
    recoveryAction: 'Upgrade to Premium for unlimited downloads',
  },
  PAYMENT_FAILED: {
    code: 'PAYMENT_FAILED',
    message: 'Payment failed',
    details: 'Your payment could not be processed',
    recoveryAction: 'Try a different payment method',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network error',
    details: 'Unable to connect to the server',
    recoveryAction: 'Check your internet connection and try again',
  },
};

/**
 * Success messages
 */
export const successMessages = {
  DOWNLOAD_STARTED: 'Download started! Check your downloads folder.',
  PAYMENT_COMPLETED: 'Payment completed! Your subscription is now active.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  SUBSCRIPTION_UPGRADED: 'Subscription upgraded! Enjoy premium features.',
};

/**
 * Loading messages
 */
export const loadingMessages = {
  DOWNLOADING: 'Downloading video...',
  PROCESSING_PAYMENT: 'Processing payment...',
  LOADING_VIDEO: 'Loading video information...',
  UPDATING_PROFILE: 'Updating profile...',
};

/**
 * Empty state messages
 */
export const emptyStateMessages = {
  NO_DOWNLOADS: 'No downloads yet. Start by pasting an XHS URL above.',
  NO_HISTORY: 'Your download history will appear here.',
  NO_FAVORITES: 'Save videos to your favorites to see them here.',
  NO_RESULTS: 'No results found. Try a different search.',
};

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Generate toast
 */
export function createToast(
  type: ToastType,
  message: string,
  duration = 3000
): Toast {
  return {
    id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    message,
    duration,
  };
}

/**
 * Validation utilities
 */
export const validators = {
  isValidXHSUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.hostname.includes('xiaohongshu.com') ||
        urlObj.hostname.includes('xhslink.com')
      );
    } catch {
      return false;
    }
  },

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 20;
  },

  isStrongPassword(password: string): boolean {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  },
};

/**
 * Format utilities
 */
export const formatters = {
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  },

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },
};

/**
 * Accessibility utilities
 */
export const a11y = {
  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Focus element
   */
  focus(element: HTMLElement | null): void {
    if (element) {
      element.focus();
    }
  },

  /**
   * Trap focus in modal
   */
  trapFocus(element: HTMLElement): void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    element.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  },
};
