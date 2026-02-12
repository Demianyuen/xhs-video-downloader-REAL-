/**
 * Dark Mode Theme System
 * Provides theme switching and persistence
 */

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  primary: {
    light: string;
    dark: string;
  };
  secondary: {
    light: string;
    dark: string;
  };
  background: {
    light: string;
    dark: string;
  };
  text: {
    light: string;
    dark: string;
  };
}

export const themeConfig: ThemeConfig = {
  primary: {
    light: '#ec4899', // pink-500
    dark: '#db2777', // pink-600
  },
  secondary: {
    light: '#f97316', // orange-500
    dark: '#ea580c', // orange-600
  },
  background: {
    light: '#ffffff',
    dark: '#0f172a', // slate-900
  },
  text: {
    light: '#000000',
    dark: '#f1f5f9', // slate-100
  },
};

/**
 * Theme utilities for client-side
 */
export const themeUtils = {
  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    if (typeof window === 'undefined') return 'system';

    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // system
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  /**
   * Toggle theme
   */
  toggleTheme(): Theme {
    const current = this.getCurrentTheme();
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
    return next;
  },

  /**
   * Initialize theme on page load
   */
  initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const theme = this.getCurrentTheme();
    this.setTheme(theme);
  },
};

/**
 * Dark mode CSS variables
 */
export const darkModeCss = `
/* Dark mode theme variables */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --foreground: #f1f5f9;
    --primary: #db2777;
    --secondary: #ea580c;
  }
}

/* Dark mode class override */
:root.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
  --primary: #db2777;
  --secondary: #ea580c;
}

/* Dark mode component styles */
.dark {
  background-color: #0f172a;
  color: #f1f5f9;
}

.dark .bg-white {
  background-color: #1e293b;
}

.dark .text-gray-900 {
  color: #f1f5f9;
}

.dark .text-gray-600 {
  color: #cbd5e1;
}

.dark .border-gray-200 {
  border-color: #334155;
}

.dark .bg-gray-50 {
  background-color: #1e293b;
}

.dark .bg-gray-100 {
  background-color: #334155;
}
`;
