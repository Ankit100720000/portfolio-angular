import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';

  // Signal for theme state
  public theme = signal<ThemeMode>('dark'); // Default to dark, will be updated in constructor

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize theme only in browser
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem(this.THEME_KEY) as ThemeMode;
      const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      this.theme.set(initialTheme);

      // Apply theme on initialization
      this.applyTheme(initialTheme);
    }

    // Watch for theme changes
    effect(() => {
      const currentTheme = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(currentTheme);
        localStorage.setItem(this.THEME_KEY, currentTheme);
      }
    });
  }

  toggleTheme(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('light-mode', theme === 'light');
    root.classList.toggle('dark-mode', theme === 'dark');
  }
}
