import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  afterNextRender,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ThemeService } from '../../services/theme.service';

// Browser-only imports - will be dynamically loaded
type SwiperType = typeof import('swiper').Swiper;
type SwiperModulesType = typeof import('swiper/modules');
type LenisType = typeof import('lenis').default;


@Component({
  selector: 'app-home-modern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Custom Cursor -->
    <!-- Custom Cursor Removed -->

    <div
      id="main-wrapper"
      class="min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 ease-in-out w-full"
      [style.background-color]="'var(--bg-primary)'"
      [style.color]="'var(--text-primary)'"
      [class.dark-mode]="themeService.theme() === 'dark'"
      [class.light-mode]="themeService.theme() === 'light'"
    >
      <!-- FLOATING BACKGROUND ELEMENTS -->
      <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full">
        <div
          class="float-element absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] mix-blend-screen will-change-transform"
        ></div>
        <div
          class="float-element absolute top-[40%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen will-change-transform"
        ></div>
        <div
          class="float-element absolute bottom-[10%] left-[20%] w-72 h-72 bg-pink-500/10 rounded-full blur-[90px] mix-blend-screen will-change-transform"
        ></div>
      </div>

      <!-- NAV (Fixed) with Glassmorphism & Neomorphism -->
      <nav
            class="fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-3 flex justify-between items-center backdrop-blur-xl glass-nav neomorphic-nav border-b dark-mode-nav"
            [style.border-bottom-color]="themeService.theme() === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'"
            [style.color]="'var(--text-primary)'"
      >
        <div
          class="text-lg md:text-xl font-black tracking-tight cursor-pointer transition-all duration-300 gradient-text-primary cursor-pointer-link "
        >
          ANKIT MAURYA
        </div>
        <div class="hidden md:flex gap-10 text-sm font-semibold">
          <a
            href="#about"
            (click)="scrollTo('#about')"
            class="relative group cursor-pointer-link transition-all duration-300"
            [style.color]="'var(--text-secondary)'"
            [style.font-weight]="'500'"
          >
            <span class="relative z-10 group-hover:opacity-100 opacity-80">About</span>
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"
            ></span>
          </a>
          <a
            href="#work"
            (click)="scrollTo('#work')"
            class="relative group cursor-pointer-link transition-all duration-300"
            [style.color]="'var(--text-secondary)'"
            [style.font-weight]="'500'"
          >
            <span class="relative z-10 group-hover:opacity-100 opacity-80">Projects</span>
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"
            ></span>
          </a>
          <a
            href="#contact"
            (click)="scrollTo('#contact')"
            class="relative group cursor-pointer-link transition-all duration-300"
            [style.color]="'var(--text-secondary)'"
            [style.font-weight]="'500'"
          >
            <span class="relative z-10 group-hover:opacity-100 opacity-80">Contact</span>
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"
            ></span>
          </a>
        </div>
        <div class="flex items-center gap-3">
          <!-- Theme Toggle Button with Neomorphism -->
        <button
            (click)="toggleTheme()"
            class="theme-toggle neomorphic-button glass-button w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer-button hover:scale-110 active:scale-95"
            [attr.aria-label]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg *ngIf="themeService.theme() === 'dark'" class="w-5 h-5 md:w-6 md:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg *ngIf="themeService.theme() === 'light'" class="w-5 h-5 md:w-6 md:h-6" [style.color]="'var(--text-secondary)'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          <a
            href="mailto:mauryankit2615@gmail.com"
          #magneticBtn
            class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border backdrop-blur-md text-xs font-semibold uppercase tracking-wider relative overflow-hidden group cursor-pointer-button transition-all duration-300 neomorphic-button-inverted glass-button"
            [style.border-color]="'var(--border-color)'"
            [style.background]="'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))'"
        >
            <span class="relative z-10 transition-colors duration-300" [style.color]="'var(--text-primary)'"
              >Hire Me</span
          >
          <div
              class="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-full"
          ></div>
          </a>
        </div>
      </nav>

      <!-- HERO SECTION -->
      <header
        id="hero-section"
        (mousemove)="onHeroMouseMove($event)"
        class="relative h-screen flex flex-col items-center justify-center overflow-hidden data-color='zinc'"
      >
        <div class="relative inset-0 z-0 pt-10">
          <!-- Parallax Background Images -->
          <!-- <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2969&auto=format&fit=crop"
            alt="Background 1"
            class="absolute top-0 left-0 w-full h-full object-cover opacity-10 hero-bg-1 parallax-bg"
            data-speed="0.05"
            loading="lazy"
          /> -->
          <!-- <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
            alt="Background 2"
            class="absolute top-0 right-0 w-1/2 h-full object-cover opacity-5 hero-bg-2 parallax-bg"
            data-speed="-0.05"
            loading="lazy"
          /> -->
          <!-- Parallax Background Gradients -->
          <div
            class="parallax-bg absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-linear-to-br from-purple-600/30 via-cyan-600/20 to-pink-600/30 rounded-full blur-[120px] will-change-transform"
            data-speed="0.05"
          ></div>
          <div
            class="parallax-bg absolute bottom-[-20%] right-[-10%] w-[70vw] h-[60vw] bg-linear-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[120px] will-change-transform"
            data-speed="-0.05"
          ></div>
          <!-- Animated Noise Texture -->
          <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
          <!-- Floating Images -->
          <!-- <img
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2940&auto=format&fit=crop"
            alt="Floating Element 1"
            class="absolute top-20 right-20 w-32 h-32 rounded-full object-cover opacity-20 blur-sm hero-float-1"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874&auto=format&fit=crop"
            alt="Floating Element 2"
            class="absolute bottom-20 left-20 w-40 h-40 rounded-full object-cover opacity-15 blur-sm hero-float-2"
            loading="lazy"
          /> -->
        </div>

        <div class="z-10 text-center px-4 relative">
          <div class="overflow-hidden mb-6">
            <p
              class="hero-label text-label transform translate-y-full text-cyan-400 font-mono text-sm md:text-base tracking-[0.3em] uppercase"
            >
              Frontend Developer
            </p>
          </div>

          <h1
            class="hero-title text-display text-6xl md:text-[8rem] lg:text-[9rem] font-black leading-[0.95] tracking-tighter"
          >
            <div class="overflow-hidden">
              <span
                class="block transform translate-y-full parallax-text will-change-transform text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400"
                data-speed="0.02"
                >ANKIT</span
              >
            </div>
            <div class="overflow-hidden">
              <span
                class="block transform translate-y-full text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-300 to-purple-300 parallax-text will-change-transform"
                data-speed="0.04"
                >MAURYA</span
              >
            </div>
          </h1>

          <div class="mt-10 md:mt-12 overflow-hidden">
            <p
              class="hero-desc text-body max-w-3xl mx-auto text-base md:text-lg leading-relaxed transform translate-y-full parallax-text will-change-transform"
              [style.color]="'var(--text-secondary)'"
              data-speed="0.01"
            >
              Results-driven Frontend Developer with 3 years of experience designing and developing responsive, high-performance web applications and enterprise-grade ERP dashboards. Expert in React.js, JavaScript, GSAP animations, and modern UI/UX design.
            </p>
          </div>

          <div class="mt-10 md:mt-14 overflow-hidden flex flex-wrap justify-center gap-3 md:gap-4">
            <a
              href="tel:+916386139226"
              class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border backdrop-blur-md text-sm font-medium transition-all transform translate-y-full hero-contact glass-button"
              [style.border-color]="'rgba(6, 182, 212, 0.3)'"
              [style.background]="'rgba(6, 182, 212, 0.05)'"
              [style.color]="'var(--text-primary)'"
            >
              +91 6386139226
            </a>
            <a
              href="mailto:mauryankit2615@gmail.com"
              class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border backdrop-blur-md text-sm font-medium transition-all transform translate-y-full hero-contact glass-button"
              [style.border-color]="'rgba(168, 85, 247, 0.3)'"
              [style.background]="'rgba(168, 85, 247, 0.05)'"
              [style.color]="'var(--text-primary)'"
            >
              mauryankit2615@gmail.com
            </a>
            <a
              href="https://ankitportfolio.site"
              target="_blank"
              class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border backdrop-blur-md text-sm font-medium transition-all transform translate-y-full hero-contact glass-button"
              [style.border-color]="'rgba(236, 72, 153, 0.3)'"
              [style.background]="'rgba(236, 72, 153, 0.05)'"
              [style.color]="'var(--text-primary)'"
            >
              ankitportfolio.site
            </a>
          </div>
        </div>

        <div
          class="absolute bottom-10 right-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce"
        >
          <span class="text-[10px] uppercase tracking-widest">Scroll</span>
          <div class="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
        </div>
      </header>

      <!-- INFINITE MARQUEE SECTION -->
      <section
        class="py-3 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 overflow-hidden relative z-20   my-0 origin-center shadow-2xl mt-4"
      >
        <div class="marquee-track flex whitespace-nowrap will-change-transform">
          <div
            class="marquee-content flex gap-8 text-4xl md:text-6xl font-black uppercase items-center"
            [style.color]="'var(--text-primary)'"
          >
            <span *ngFor="let item of [1, 2, 3, 4]"
              >React.js • JavaScript • GSAP • Tailwind CSS • Chart.js • Highcharts • HTML5 • CSS3 • TypeScript • Bootstrap • Responsive Design •
            </span>
          </div>
          <!-- Duplicate for seamless loop -->
          <div
            class="marquee-content flex gap-8 text-4xl md:text-6xl font-black uppercase items-center aria-hidden='true'"
            [style.color]="'var(--text-primary)'"
          >
            <span *ngFor="let item of [1, 2, 3, 4]"
              >React.js • JavaScript • GSAP • Tailwind CSS • Chart.js • Highcharts • HTML5 • CSS3 • TypeScript • Bootstrap • Responsive Design •
            </span>
          </div>
        </div>
      </section>

      <!-- MANIFESTO / PROFILE SUMMARY SECTION -->
      <section
        id="about"
        class="min-h-screen py-24 flex items-center justify-center px-6 relative overflow-hidden"
        data-color="zinc"
      >
        <!-- Background Images -->
        <div class="absolute inset-0" [style.background]="'linear-gradient(to bottom, var(--bg-primary), var(--bg-primary))'" [style.opacity]="0.8"></div>

        <div class="max-w-6xl mx-auto relative z-10">
          <!-- Header with Icon -->
          <div class="flex items-center justify-center gap-4 mb-12">
            <div class="w-16 h-16 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center profile-icon-container">
              <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 class="text-label text-cyan-400 font-mono tracking-widest uppercase">Professional Summary</h2>
          </div>

          <!-- Main Summary Text with Icons -->
          <div class="relative">
            <div class="absolute -left-8 top-0 w-1 h-full bg-linear-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-20 hidden md:block"></div>
          <p
            #manifestoText
              class="text-2xl md:text-3xl lg:text-3xl font-semibold leading-tight text-left relative"
              [style.color]="'var(--text-primary)'"
            >
              <span class="inline-flex items-center gap-2 mb-4">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Results-driven Frontend Developer
              </span>
              <br />
              with <span class="text-white font-black">3 years</span> of professional experience in designing and developing 
              <span class="inline-flex items-center gap-1 text-cyan-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                responsive, high-performance
              </span> web applications and 
              <span class="inline-flex items-center gap-1 text-purple-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                enterprise-grade ERP dashboards
              </span>. Successfully delivered 
              <span class="text-white font-black">25+ production-quality websites</span> with strong focus on 
              <span class="text-cyan-400">UI/UX excellence</span>, 
              <span class="text-purple-400">pixel-perfect implementation</span>, and 
              <span class="text-pink-400">performance optimization</span>.
            </p>
          </div>

          <!-- Achievement Cards with Icons -->
          <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="group p-8 rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/5 to-transparent backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] achievement-card">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-4xl font-black text-cyan-400 mb-1 count-up-achievement" data-value="25">25+</div>
                  <div class="text-sm uppercase tracking-widest" [style.color]="'var(--text-secondary)'">Projects Delivered</div>
                </div>
              </div>
            </div>
            
            <div class="group p-8 rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/5 to-transparent backdrop-blur-sm hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] achievement-card glass-card neomorphic-card">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-linear-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-4xl font-black text-purple-400 mb-1 count-up-achievement" data-value="3">3+</div>
                  <div class="text-sm uppercase tracking-widest" [style.color]="'var(--text-secondary)'">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div class="group p-8 rounded-2xl border border-pink-500/20 bg-linear-to-br from-pink-500/5 to-transparent backdrop-blur-sm hover:border-pink-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] achievement-card glass-card neomorphic-card">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-linear-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-4xl font-black text-pink-400 mb-1 count-up-achievement" data-value="450">450+</div>
                  <div class="text-sm uppercase tracking-widest" [style.color]="'var(--text-secondary)'">Daily Users</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Skills with Icons -->
          <div class="mt-16">
            <h3 class="text-xl font-bold text-center mb-8 flex items-center justify-center gap-2" [style.color]="'var(--text-primary)'">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              Core Expertise
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span class="text-sm" [style.color]="'var(--text-primary)'">React.js</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span class="text-sm" [style.color]="'var(--text-primary)'">GSAP</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span class="text-sm" [style.color]="'var(--text-primary)'">UI/UX</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <span class="text-sm" [style.color]="'var(--text-primary)'">Performance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- HORIZONTAL SCROLL SECTION (Philosophy/Process) -->
      <section
        id="process"
        class="h-screen overflow-hidden flex flex-col relative"
        [style.background-color]="'var(--bg-secondary)'"
        [style.color]="'var(--text-primary)'"
        data-color="light"
      >
        <div class="absolute top-10 left-6 md:left-10 z-20">
          <h2 class="text-label font-mono tracking-widest" [style.color]="'var(--text-muted)'">My Approach</h2>
        </div>
        <div
          class="horizontal-container flex h-full items-center pl-6 md:pl-20 overflow-x-visible will-change-transform"
          style="display: flex;"
        >
          <!-- Card 1 -->
          <div
            class="horizontal-panel w-[85vw] md:w-[65vw] h-[75vh] shrink-0 border p-8 md:p-12 rounded-3xl mr-6 md:mr-10 flex flex-col justify-between shadow-2xl transition-all duration-500 group glass-card"
            [style.background]="'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-tertiary))'"
            [style.border-color]="'rgba(6, 182, 212, 0.3)'"
          >
            <div class="text-7xl md:text-9xl font-black transition-colors mb-4" [style.color]="'rgba(6, 182, 212, 0.1)'">01</div>
            <div>
              <h3 class="text-2xl md:text-4xl font-bold mb-4 gradient-text-primary">Design Analysis</h3>
              <p class="text-sm md:text-lg leading-relaxed" [style.color]="'var(--text-secondary)'">
                Converting complex Figma designs into pixel-perfect, responsive layouts with 95%+ design accuracy. Understanding UI/UX patterns and translating them into scalable code.
              </p>
            </div>
          </div>
          <!-- Card 2 -->
          <div
            class="horizontal-panel w-[85vw] md:w-[65vw] h-[75vh] shrink-0 border p-8 md:p-12 rounded-3xl mr-6 md:mr-10 flex flex-col justify-between shadow-2xl transition-all duration-500 group glass-card"
            [style.background]="'linear-gradient(to bottom right, var(--bg-tertiary), var(--bg-secondary))'"
            [style.border-color]="'rgba(168, 85, 247, 0.3)'"
          >
            <div class="text-7xl md:text-9xl font-black transition-colors mb-4" [style.color]="'rgba(168, 85, 247, 0.1)'">02</div>
            <div>
              <h3 class="text-2xl md:text-4xl font-bold mb-4 flex items-center gap-2 md:gap-3 flex-wrap">
                <span class="gradient-text-secondary">React Development</span>
                <span class="text-cyan-400 text-xs md:text-sm font-normal">REACT • JS • TS</span>
              </h3>
              <p class="text-sm md:text-lg leading-relaxed" [style.color]="'var(--text-primary)'">
                Building reusable component libraries, implementing efficient state management with React hooks, and creating 30+ reusable UI components that reduce code duplication by 30%.
              </p>
            </div>
          </div>
          <!-- Card 3 -->
          <div
            class="horizontal-panel w-[85vw] md:w-[65vw] h-[75vh] shrink-0 border p-8 md:p-12 rounded-3xl mr-6 md:mr-10 flex flex-col justify-between shadow-2xl transition-all duration-500 group glass-card"
            [style.background]="'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))'"
            [style.border-color]="'rgba(168, 85, 247, 0.4)'"
            [style.color]="'var(--text-primary)'"
          >
            <div class="text-7xl md:text-9xl font-black transition-colors mb-4" [style.color]="themeService.theme() === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'">03</div>
            <div>
              <h3 class="text-2xl md:text-4xl font-bold mb-4" [style.color]="'var(--text-primary)'">Animation & Motion</h3>
              <p class="text-sm md:text-lg font-medium leading-relaxed" [style.color]="'var(--text-secondary)'">
                Implementing GSAP animations, interactive UI transitions, and engaging user experiences that make websites feel alive. Creating seamless, performant animations.
              </p>
            </div>
          </div>
          <!-- Card 4 -->
          <div
            class="horizontal-panel w-[85vw] md:w-[65vw] h-[75vh] shrink-0 border p-8 md:p-12 rounded-3xl mr-6 md:mr-20 flex flex-col justify-between shadow-2xl transition-all duration-500 group glass-card"
            [style.background]="'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-primary))'"
            [style.border-color]="'rgba(236, 72, 153, 0.3)'"
          >
            <div class="text-7xl md:text-9xl font-black transition-colors mb-4" [style.color]="'rgba(236, 72, 153, 0.1)'">04</div>
            <div>
              <h3 class="text-2xl md:text-4xl font-bold mb-4 gradient-text-primary">Performance & Optimization</h3>
              <p class="text-sm md:text-lg leading-relaxed" [style.color]="'var(--text-secondary)'">
                Code splitting, lazy loading, asset optimization achieving 25% faster load times. Performance profiling, SEO best practices, and WCAG accessibility standards implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES / SKILLS GRID -->
      <section class="py-32 px-6 relative overflow-hidden" [style.background-color]="'var(--bg-primary)'" data-color="zinc">
        <!-- Background Images -->
       
        <div class="absolute inset-0" [style.background]="'linear-gradient(to bottom, transparent, var(--bg-primary))'"></div>
        
        <div class="container mx-auto relative z-10">
          <div
            class="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8"
          >
            <div class="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2970&auto=format&fit=crop"
                alt="Expertise Icon"
                class="w-16 h-16 rounded-full object-cover opacity-50 skill-header-img"
                loading="lazy"
              />
              <h2 class="text-5xl font-black gradient-text-primary">Expertise</h2>
            </div>
            <p class="max-w-xs text-right mt-4 md:mt-0" [style.color]="'var(--text-secondary)'">
              A curated stack for modern web development with 3+ years of experience.
            </p>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div
              *ngFor="let skill of skills; let i = index"
              class="service-card group glass-card neomorphic-card backdrop-blur-sm p-5 transition-all duration-500 relative overflow-hidden"
              [style.background-color]="'var(--bg-secondary)'"
              [attr.data-index]="i"
            >
              <!-- Background Image for each skill card -->
              
              <div
                class="absolute top-0 left-0 w-1 h-0 bg-linear-to-b from-cyan-500 to-purple-500 group-hover:h-full transition-all duration-300"
              ></div>
              <!-- Icon with 3D effect -->
              <div
                class="text-5xl mb-6 opacity-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text relative z-10"
              >
                {{ skill.icon }}
              </div>
              <h3 class="text-xl font-bold mb-3 relative z-10 group-hover:text-cyan-400 transition-colors">{{ skill.title }}</h3>
              <p class="text-sm leading-relaxed relative z-10 transition-colors" [style.color]="'var(--text-secondary)'" [class.group-hover\:text-primary]="true">{{ skill.desc }}</p>
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- SELECTED PROJECTS (Enhanced Swiper with 3D, Lottie, Micro-interactions) -->
      <section id="work" class="py-32 overflow-hidden relative" data-color="zinc">
        <!-- Animated Background Gradients -->
        <div class="absolute inset-0 pointer-events-none opacity-30">
          <div class="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        </div>

        <div class="container mx-auto px-6 mb-16 relative z-10">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-label text-cyan-400 font-mono tracking-widest mb-4 uppercase">Selected Works</h2>
              <div class="text-5xl md:text-7xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent project-title">
                Featured Projects
              </div>
            </div>
            <!-- Lottie Animation Placeholder Removed -->
            <!-- <div class="hidden md:block w-32 h-32 project-lottie-container"></div> -->
          </div>
          <p class="max-w-2xl text-lg leading-relaxed" [style.color]="'var(--text-secondary)'">
            Showcasing 25+ production-quality websites with advanced animations, 3D effects, and micro-interactions. 
            Each project demonstrates expertise in React.js, GSAP animations, and modern UI/UX design principles.
          </p>
        </div>

        <div #swiperContainer class="swiper-container w-full h-[70vh] md:h-[100vh] px-6 relative z-10">
          <div class="swiper-wrapper">
            <div
              *ngFor="let project of projects; let i = index"
              class="swiper-slide w-[90vw] md:w-[65vw] h-full relative group cursor-drag project-slide"
              [attr.data-index]="i"
            >
              <!-- 3D Card Container -->
              <div
                class="absolute inset-0 rounded-3xl overflow-hidden border shadow-2xl project-card-3d transition-all duration-700"
                [style.background]="'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-tertiary))'"
                [style.border-color]="'var(--border-color)'"
              >
                <!-- Gradient Border Effect -->
                <div class="absolute inset-0 rounded-3xl bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                
                <!-- Multiple Image Gallery with Parallax -->
                <div class="absolute inset-0 image-gallery-container">
                  <img
                    [src]="project.img"
                    class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-1000 origin-center parallax-img"
                    alt="{{ project.title }}"
                    loading="lazy"
                  />
                  <img
                    *ngIf="project.img2"
                    [src]="project.img2"
                    class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-all duration-1000 parallax-img-2"
                    alt="{{ project.title }} - Detail 1"
                    loading="lazy"
                  />
                  <img
                    *ngIf="project.img3"
                    [src]="project.img3"
                    class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-all duration-1000 parallax-img-3"
                    alt="{{ project.title }} - Detail 2"
                    loading="lazy"
                  />
                </div>

                <!-- Animated Gradient Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30 group-hover:via-black/40 transition-all duration-700"></div>
                
                <!-- Lottie Animation Container Removed -->
                <!-- <div class="absolute top-8 right-8 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 project-lottie" [attr.data-project]="i"></div> -->

                <!-- Content with Advanced Micro-interactions -->
                <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full project-content">
                  <!-- Tags with Animation -->
                  <div class="flex flex-wrap items-center gap-3 mb-6 tags-container">
                    <span
                      *ngFor="let tag of project.tags; let tagIndex = index"
                      class="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-mono uppercase backdrop-blur-md tag-item transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                      [style.transition-delay.ms]="tagIndex * 50"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Title with 3D Text Effect -->
                  <h3
                    class="text-4xl md:text-6xl lg:text-7xl font-black mb-4 project-title-text transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100"
                    style="text-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(168, 85, 247, 0.3);"
                  >
                    {{ project.title }}
                  </h3>

                  <!-- Description -->
                  <p
                    class="max-w-2xl mb-6 text-lg leading-relaxed project-desc transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200"
                    [style.color]="'var(--text-primary)'"
                  >
                    {{ project.desc }}
                  </p>

                  <!-- Full Description (Expandable) -->
                  <div class="mb-6 project-full-desc-container transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                    <p class="text-sm leading-relaxed max-w-2xl" [style.color]="'var(--text-secondary)'">
                      {{ project.fullDesc || project.desc }}
                  </p>
                </div>

                  <!-- Tech Stack -->
                  <div *ngIf="project.tech" class="mb-6 tech-stack-container transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-400">
                    <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Tech Stack</div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        *ngFor="let tech of project.tech"
                        class="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs"
                      >
                        {{ tech }}
                      </span>
              </div>
            </div>

                  <!-- Achievements -->
                  <div *ngIf="project.achievements" class="mb-6 achievements-container transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-500">
                    <div class="grid grid-cols-2 gap-3">
                      <div
                        *ngFor="let achievement of project.achievements"
                        class="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium"
                      >
                        ✓ {{ achievement }}
          </div>
                    </div>
                  </div>

                  <!-- Action Buttons with Magnetic Effect -->
                  <div class="flex items-center gap-4 project-actions transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-600">
                    <a
                      *ngIf="project.url && project.url !== '#'"
                      [href]="project.url"
                      target="_blank"
                      class="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-400 bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-sm font-bold hover:from-cyan-500/40 hover:to-purple-500/40 hover:border-cyan-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    >
                      Visit Site
                      <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <button
                      class="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-purple-400/50 bg-linear-to-r from-purple-500/10 to-pink-500/10 text-purple-300 text-sm font-bold hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                    >
                      View Details
                      <span>↗</span>
                    </button>
                  </div>
                </div>

                <!-- 3D Hover Glow Effect -->
                <div class="absolute inset-0 rounded-3xl bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

          <!-- Custom Navigation with Icons -->
          <div class="flex justify-center items-center gap-4 mt-12 relative z-10">
            <button 
              class="swiper-button-prev-custom w-14 h-14 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-white hover:scale-110 hover:from-cyan-500/40 hover:to-purple-500/40 transition-all magnetic-btn-nav group"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div class="swiper-pagination-custom flex gap-2"></div>
            <button 
              class="swiper-button-next-custom w-14 h-14 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 flex items-center justify-center text-white hover:scale-110 hover:from-purple-500/40 hover:to-pink-500/40 transition-all magnetic-btn-nav group"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
        </div>
      </section>

      <!-- EXPERIENCE TIMELINE -->
      <section class="py-32 relative overflow-hidden" data-color="zinc">
        <!-- Background Images -->
        <img
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874&auto=format&fit=crop"
          alt="Experience Background"
          class="absolute top-0 right-0 w-1/3 h-full object-cover opacity-5 experience-bg"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-linear-to-l from-zinc-950 via-zinc-950/90 to-transparent"></div>
        
        <div class="container mx-auto px-6 max-w-4xl relative z-10">
          <div class="flex items-center justify-center gap-6 mb-20">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
              alt="Journey Icon"
              class="w-20 h-20 rounded-full object-cover opacity-30 timeline-header-img"
              loading="lazy"
            />
              <h2 class="text-4xl md:text-5xl font-black gradient-text-primary">Journey</h2>
          </div>

          <div class="relative border-l border-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 ml-6 md:ml-0 space-y-20">
            <div
              *ngFor="let job of experience; let i = index"
              class="relative pl-12 md:pl-0 md:flex md:gap-12 group timeline-item"
              [attr.data-index]="i"
            >
              <!-- Background Image for each experience -->
             
              
              <!-- Dot with gradient -->
              <div
                class="absolute left-[-5px] top-2 w-3 h-3 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10 md:left-auto md:right-full md:mr-[-5px] group-hover:scale-150 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300"
              ></div>

              <div class="md:w-1/3 md:text-right md:pr-12 relative z-10">
                <span class="text-cyan-400 font-mono text-xs group-hover:text-purple-400 transition-colors">{{ job.period }}</span>
                <h4 class="text-xl font-bold mt-1 mb-1 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">{{ job.role }}</h4>
                <p class="text-purple-400 text-xs font-medium group-hover:text-pink-400 transition-colors">{{ job.location }}</p>
              </div>
              <div class="md:w-2/3 md:border-l md:border-gradient-to-b md:from-cyan-500/30 md:via-purple-500/30 md:to-pink-500/30 md:pl-12 pb-1 relative">
                <div class="flex items-start gap-4 mb-3">
                  <img
                    [src]="job.image"
                    [alt]="job.company"
                    class="w-12 h-12 rounded-full object-cover opacity-50 group-hover:opacity-100 transition-opacity company-logo hidden md:block"
                    loading="lazy"
                  />
                  <div>
                    <h5 class="text-lg font-bold transition-colors" [style.color]="'var(--text-primary)'">{{ job.company }}</h5>
                    <p class="text-sm leading-relaxed transition-colors" [style.color]="'var(--text-secondary)'">{{ job.desc }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- EDUCATION SECTION -->
      <section class="py-32 relative" data-color="zinc">
        <div class="container mx-auto px-6 max-w-4xl">
          <h2 class="text-label text-cyan-400 font-mono tracking-widest mb-4 text-center uppercase">Education</h2>
          <h2 class="text-4xl md:text-5xl font-black mb-20 text-center gradient-text-primary">Academic Background</h2>

          <div class="relative border-l border-cyan-500/30 ml-6 md:ml-0 space-y-12">
            <div class="relative pl-12 md:pl-0 md:flex md:gap-12 group timeline-item">
              <!-- Dot -->
              <div
                class="absolute left-[-5px] top-2 w-3 h-3 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10 md:left-auto md:right-full md:mr-[-5px] group-hover:scale-150 transition-transform"
              ></div>

              <div class="md:w-1/3 md:text-right md:pr-12">
                <span class="text-purple-400 font-mono text-xs">2019 - 2022</span>
                <h4 class="text-xl font-bold mt-1 mb-1">Bachelor of Computer Applications</h4>
                <p class="text-cyan-400 text-xs font-medium">Jaunpur, Uttar Pradesh</p>
              </div>
              <div class="md:w-2/3 md:border-l md:border-cyan-500/30 md:pl-12 pb-1 relative">
                <h5 class="text-lg font-bold text-slate-300 mb-2">Veer Bahadur Singh Purvanchal University</h5>
                <p class="text-slate-400 text-sm leading-relaxed">
                  Completed Bachelor of Computer Applications (BCA) with a strong foundation in computer science fundamentals, programming languages, and software development practices. Focused on web development technologies and modern frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STATS -->
      <section class="py-20 border-y section-spacing" [style.border-color]="'var(--border-color)'" [style.background]="'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))'" data-color="zinc">
        <div class="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div *ngFor="let stat of stats" class="stat-item group">
            <div
              class="text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-b from-cyan-400 via-purple-400 to-pink-400 count-up group-hover:scale-110 transition-transform duration-300"
              [attr.data-val]="stat.value"
            >
              0
            </div>
            <div class="text-xs font-mono uppercase tracking-widest text-cyan-400 group-hover:text-purple-400 transition-colors">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER / CTA -->
      <section
        id="contact"
        class="py-32 relative overflow-hidden flex flex-col items-center justify-center text-center"
        data-color="zinc"
      >
        <div
          class="absolute inset-0 bg-linear-to-b from-transparent to-cyan-900/10 pointer-events-none"
        ></div>

        <p class="text-label text-cyan-400 font-mono mb-6 tracking-widest">What's Next?</p>
        <h2
          class="text-display text-5xl md:text-7xl lg:text-9xl font-black mb-12 tracking-tighter hover:tracking-wide transition-all duration-700 cursor-default gradient-text-primary"
        >
          Let's Work<br />Together
        </h2>

        <div class="flex flex-col items-center gap-6 mb-12">
        <a
            href="mailto:mauryankit2615@gmail.com"
            class="px-8 py-4 md:px-10 md:py-5 bg-linear-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]"
        >
          Start a Project
        </a>
          <div class="flex flex-wrap justify-center gap-4 text-sm" [style.color]="'var(--text-secondary)'">
            <a href="tel:+916386139226" class="hover:text-cyan-400 transition-colors duration-300">+91 6386139226</a>
            <span [style.color]="'var(--text-muted)'">•</span>
            <a href="mailto:mauryankit2615@gmail.com" class="hover:text-purple-400 transition-colors duration-300">mauryankit2615@gmail.com</a>
            <span [style.color]="'var(--text-muted)'">•</span>
            <a href="https://ankitportfolio.site" target="_blank" class="hover:text-pink-400 transition-colors duration-300">ankitportfolio.site</a>
          </div>
        </div>

        <footer
          class="mt-32 w-full border-t pt-12 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-sm"
          [style.border-color]="'var(--border-color)'"
          [style.color]="'var(--text-muted)'"
        >
          <div class="text-body">© 2025 Ankit Maurya | Frontend Developer</div>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/Ankit100720000" target="_blank" class="hover:text-cyan-400 transition-colors duration-300 font-medium">GitHub</a>
            <a href="https://linkedin.com/in/ankit-maurya2000" target="_blank" class="hover:text-purple-400 transition-colors duration-300 font-medium">LinkedIn</a>
            <a href="https://ankitportfolio.site" target="_blank" class="hover:text-pink-400 transition-colors duration-300 font-medium">Portfolio</a>
          </div>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      /* Swiper CSS fallback if not global */
      .swiper-slide {
        transition: transform 0.3s;
      }
      .cursor-drag {
        cursor: grab;
      }
      .cursor-drag:active {
        cursor: grabbing;
      }
      .will-change-transform {
        will-change: transform;
      }
      /* Modern glassmorphism effects */
      .hero-contact {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      
      /* Ensure hero elements are properly animated */
      .hero-label,
      .hero-title span,
      .hero-desc {
        will-change: transform;
      }
      /* Gradient text animation */
      @keyframes gradient-shift {
        0%,
        100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      /* Smooth transitions for modern UI */
      .service-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .service-card:hover {
        transform: translateY(-4px);
      }
      /* Enhanced shadow effects with gradients */
      .horizontal-panel {
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(6, 182, 212, 0.1);
        min-width: fit-content;
      }
      .horizontal-panel:hover {
        box-shadow:
          0 30px 80px rgba(0, 0, 0, 0.4),
          0 0 60px rgba(168, 85, 247, 0.2);
        transform: translateY(-4px);
      }
      
      /* Horizontal container fixes */
      .horizontal-container {
        min-width: max-content;
        gap: 0;
      }
      
      @media (max-width: 768px) {
        .horizontal-panel {
          min-width: 85vw;
        }
      }
      /* Project Card Effects (tilt removed) */
      .project-card-3d {
        backface-visibility: hidden;
      }
      /* Smooth gradient animations */
      @keyframes gradient-shift {
        0%,
        100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      .bg-linear-to-r {
        background-size: 200% 200%;
        animation: gradient-shift 5s ease infinite;
      }
      /* Micro-interaction hover effects */
      .tag-item,
      .magnetic-btn,
      .magnetic-btn-nav {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .tag-item:hover {
        transform: translateY(-2px) scale(1.05);
      }
      /* Image gallery parallax container */
      .image-gallery-container {
        /* 3D effects removed */
      }
      /* Enhanced parallax effects */
      .parallax-img,
      .parallax-img-2,
      .parallax-img-3 {
        will-change: transform;
      }
      /* Lottie animation container */
      .project-lottie,
      .project-lottie-container {
        pointer-events: none;
      }
      /* 3D perspective removed */
      /* Smooth scrolling enhancement */
      html {
        scroll-behavior: smooth;
      }
      /* Glassmorphism effects */
      .backdrop-blur-md {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      /* Advanced hover states */
      .project-slide:hover .project-card-3d {
        box-shadow:
          0 40px 100px rgba(0, 0, 0, 0.5),
          0 0 80px rgba(6, 182, 212, 0.3),
          0 0 120px rgba(168, 85, 247, 0.2);
      }
      /* Swiper pagination styles */
      .swiper-pagination-custom {
        position: relative !important;
        bottom: auto !important;
        margin-top: 1rem;
      }
      .swiper-pagination-bullet-custom {
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        background: rgba(148, 163, 184, 0.3) !important;
        transition: all 0.3s ease !important;
        margin: 0 4px !important;
        opacity: 1 !important;
      }
      .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
        width: 32px !important;
        border-radius: 6px !important;
        background: linear-gradient(to right, #06b6d4, #a855f7) !important;
      }
      /* Swiper navigation button styles */
      .swiper-button-prev-custom,
      .swiper-button-next-custom {
        cursor: pointer;
        z-index: 100;
      }
      .swiper-button-prev-custom:active,
      .swiper-button-next-custom:active {
        transform: scale(0.95);
      }
      /* Achievement card animations */
      .achievement-card {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .achievement-card:hover {
        transform: translateY(-8px) scale(1.05);
      }
      /* Skill badge hover */
      .skill-badge:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.1);
      }
      /* Profile icon animation */
      .profile-icon-container {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      /* Swiper button disabled state */
      .swiper-button-disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    `,
  ],
})
export class HomeModernComponent implements OnDestroy {
  @ViewChildren('manifestoText') manifestoText!: QueryList<ElementRef>;
  @ViewChild('magneticBtn') magneticBtn!: ElementRef;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  private lenis!: any;
  private resizeObserver!: ResizeObserver;
  private swiperInstance: any;
  private SwiperClass: any;
  private SwiperModules: any;
  private LenisClass: any;
  private lottieLib: any;

  skills = [
    {
      title: 'React.js & JavaScript',
      desc: 'ES6+, React hooks, component architecture',
      icon: '⚛️',
    },
    { title: 'GSAP Animations', desc: 'Interactive UI animations and transitions', icon: '🎨' },
    { title: 'UI/UX Design', desc: 'Pixel-perfect Figma-to-code conversion', icon: '🎯' },
    { title: 'Data Visualization', desc: 'Chart.js, Highcharts, D3.js for dashboards', icon: '📊' },
    { title: 'Tailwind CSS', desc: 'Utility-first CSS framework expertise', icon: '💨' },
    {
      title: 'Performance Optimization',
      desc: 'Code splitting, lazy loading, SEO best practices',
      icon: '🚀',
    },
    { title: 'Responsive Design', desc: 'Mobile-first, cross-browser compatibility', icon: '📱' },
    {
      title: 'ERP Dashboards',
      desc: 'Enterprise-grade CRM, Finance, Logistics modules',
      icon: '🏢',
    },
  ];

  projects = [
    {
      title: 'Enterprise ERP Dashboard',
      desc: 'Comprehensive ERP solution featuring CRM, Logistics Management, Finance Module, WMS, and PMS with advanced chart-based analytics and real-time data visualization using Highcharts and Chart.js. Serving 450+ daily users.',
      fullDesc:
        'Architected and developed interactive ERP dashboards for CRM, Project Management System (PMS), Finance, and Logistics modules. Implemented dynamic data visualization using Highcharts and Chart.js, enabling real-time analytics and business intelligence reporting. Designed 30+ reusable React UI components with Tailwind CSS, reducing code duplication by 30%. Optimized application performance through code splitting, lazy loading, and asset optimization, improving page load times by 25%.',

      img2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3024&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874&auto=format&fit=crop',
      tags: ['React.js', 'Chart.js', 'Highcharts', 'ERP', 'Dashboard'],
      tech: [
        'React.js',
        'JavaScript ES6+',
        'Chart.js',
        'Highcharts',
        'Tailwind CSS',
        'RESTful API',
      ],
      url: '#',
      achievements: [
        '450+ Daily Users',
        '30% Code Reduction',
        '25% Faster Load Times',
        '30+ Reusable Components',
      ],
      lottieUrl: 'https://lottie.host/1c4c3c3c-3c3c-3c3c-3c3c-3c3c3c3c3c3c/Animations.json',
    },
    {
      title: 'Kolkata Couture Expo',
      desc: 'Premium fashion event website with animated galleries, event registration system, and fully responsive design. Features GSAP animations and interactive UI components.',
      fullDesc:
        'Developed a premium fashion event website with animated image galleries, comprehensive event registration system, and fully responsive design across all devices. Implemented GSAP animations for smooth transitions and interactive UI components. Converted Figma designs into pixel-perfect code with 95%+ design accuracy. Features include event schedule display, exhibitor listings, ticket booking system, and social media integration.',
      img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2874&auto=format&fit=crop',
      tags: ['React', 'GSAP', 'Tailwind CSS', 'Event'],
      tech: ['React.js', 'GSAP Animation', 'Tailwind CSS', 'JavaScript', 'Responsive Design'],
      url: 'https://kolkatacoutureexpo.com',
      achievements: [
        '95%+ Design Accuracy',
        'Fully Responsive',
        'GSAP Animations',
        'Event Registration System',
      ],
      lottieUrl: 'https://lottie.host/fashion-animation.json',
    },
    {
      title: 'Futtkr E-Billing',
      desc: 'Enterprise billing solution featuring comprehensive dashboard, invoice generation, payment tracking, and client management system with real-time data updates.',
      fullDesc:
        'Built enterprise-grade billing solution with comprehensive dashboard featuring invoice generation, payment tracking, and client management system. Implemented real-time data updates and interactive charts for financial analytics. Features include automated invoice generation, payment gateway integration, client portal, expense tracking, and detailed reporting system. Optimized for performance with efficient data management and caching strategies.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2940&auto=format&fit=crop',
      tags: ['React.js', 'Chart.js', 'Dashboard', 'Billing'],
      tech: ['React.js', 'Chart.js', 'JavaScript', 'RESTful API', 'Payment Gateway'],
      url: 'https://www.futtkr.com',
      achievements: [
        'Real-time Updates',
        'Automated Invoicing',
        'Payment Tracking',
        'Client Portal',
      ],
      lottieUrl: 'https://lottie.host/billing-animation.json',
    },
    {
      title: 'Kolkata Fashion Expo',
      desc: 'Event management platform with registration system, exhibitor listings, and interactive UI components. Fully responsive with modern design patterns.',
      fullDesc:
        'Created event management platform with comprehensive registration system, exhibitor listings, and interactive UI components. Implemented modern design patterns with smooth animations and micro-interactions. Features include event calendar, exhibitor directory, visitor registration, badge generation, and social sharing capabilities. Optimized for SEO with semantic HTML structure and performance best practices.',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2969&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop',
      tags: ['React', 'GSAP', 'Bootstrap', 'Event'],
      tech: ['React.js', 'GSAP', 'Bootstrap', 'JavaScript', 'Event Management'],
      url: 'https://kolkatafashionexpo.org',
      achievements: [
        'Event Calendar',
        'Exhibitor Directory',
        'Visitor Registration',
        'SEO Optimized',
      ],
      lottieUrl: 'https://lottie.host/expo-animation.json',
    },
    {
      title: 'Khazana Sarees',
      desc: 'E-commerce platform for ethnic wear with product catalog, advanced filtering, cart functionality, and seamless payment integration. Built with modern e-commerce best practices.',
      fullDesc:
        'Developed full-featured e-commerce platform for ethnic wear with comprehensive product catalog, advanced filtering system, shopping cart functionality, and seamless payment gateway integration. Implemented modern e-commerce best practices including product search, category navigation, wishlist functionality, order tracking, and customer reviews. Optimized for conversions with smooth checkout process and mobile-first responsive design.',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?q=80&w=2940&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2940&auto=format&fit=crop',
      tags: ['E-commerce', 'React', 'Shopify', 'Payment'],
      tech: ['React.js', 'Shopify API', 'Payment Gateway', 'E-commerce', 'Shopping Cart'],
      url: 'https://www.khazanasarees.com',
      achievements: [
        'Payment Integration',
        'Advanced Filtering',
        'Shopping Cart',
        'Order Tracking',
      ],
      lottieUrl: 'https://lottie.host/ecommerce-animation.json',
    },
    {
      title: 'Kolkata Fabric Expo',
      desc: 'B2B textile marketplace with vendor listings, product catalog, and inquiry forms. Optimized for performance with 30% load time improvement.',
      fullDesc:
        'Built B2B textile marketplace platform with comprehensive vendor listings, detailed product catalog, and inquiry form system. Optimized for performance achieving 30% load time improvement through image compression, code minification, and caching strategies. Features include vendor profiles, product search, category filtering, inquiry management, and vendor dashboard. Implemented accessibility standards (WCAG 2.1) for inclusive user experience.',
      img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2958&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2959&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop',
      tags: ['B2B', 'React', 'Tailwind CSS', 'Marketplace'],
      tech: ['React.js', 'Tailwind CSS', 'B2B Platform', 'Vendor Management', 'Performance'],
      url: 'https://www.kolkatafabricexpo.com',
      achievements: [
        '30% Faster Load',
        'B2B Marketplace',
        'Vendor Dashboard',
        'WCAG 2.1 Compliant',
      ],
      lottieUrl: 'https://lottie.host/marketplace-animation.json',
    },
  ];

  experience = [
    {
      period: 'Mar 2025 – Present',
      role: 'Frontend Developer',
      company: 'Science Olympiad Foundation (SOF)',
      location: 'Gurugram, Haryana',
      desc: 'Architected and developed interactive ERP dashboards for CRM, Project Management System (PMS), Finance, and Logistics modules serving 450+ internal users daily. Implemented dynamic data visualization using Highcharts and Chart.js. Designed 30+ reusable React UI components with Tailwind CSS, reducing code duplication by 30%. Optimized application performance through code splitting and lazy loading, improving page load times by 25%.',
      image: 'https://egugottsbu8.exactdn.com/wp-content/uploads/2023/02/SOF-Examination.jpg?strip=all&lossy=1&quality=60&webp=60&avif=30&ssl=1',
    },
    {
      period: 'Oct 2023 – Mar 2025',
      role: 'Web Developer',
      company: 'Kashish Technology Pvt. Ltd.',
      location: 'Noida Sector 2',
      desc: 'Successfully delivered 15+ professional websites for clients across e-commerce, fashion, technology, and service industries. Developed pixel-perfect, responsive layouts using HTML5, CSS3, JavaScript, Bootstrap, and Tailwind CSS. Implemented GSAP animations and converted Figma designs into production-ready code with 95%+ design accuracy. Managed end-to-end deployment on Hostinger and GoDaddy hosting platforms.',
      image: 'https://egugottsbu8.exactdn.com/wp-content/uploads/2023/02/SOF-Examination.jpg?strip=all&lossy=1&quality=60&webp=60&avif=30&ssl=1',
    },
    {
      period: 'Feb 2023 – Sep 2023',
      role: 'Web Developer',
      company: 'PSS Technoservices Pvt. Ltd.',
      location: 'Noida Sector 62',
      desc: 'Developed 10+ responsive, mobile-first websites using modern web technologies. Optimized website performance through image compression, minification, and caching strategies, reducing load times by 30%. Implemented accessibility standards (WCAG 2.1) ensuring inclusive web experiences. Collaborated with designers and project managers in agile sprints using Jira.',
      image: 'https://egugottsbu8.exactdn.com/wp-content/uploads/2023/02/SOF-Examination.jpg?strip=all&lossy=1&quality=60&webp=60&avif=30&ssl=1',
    },
    {
      period: 'Feb 2023 – May 2023',
      role: 'Web Developer Intern',
      company: 'PSS Technoservices Pvt. Ltd.',
      location: 'Noida Sector 62',
      image: 'https://egugottsbu8.exactdn.com/wp-content/uploads/2023/02/SOF-Examination.jpg?strip=all&lossy=1&quality=60&webp=60&avif=30&ssl=1',
      desc: 'Converted complex Figma designs into pixel-perfect, responsive UI screens using HTML, CSS, and JavaScript. Assisted senior developers in debugging JavaScript issues and implementing UI enhancements. Gained hands-on experience with Git version control and agile development methodologies.',
    },
  ];

  stats = [
    { label: 'Years Experience', value: 3 },
    { label: 'Projects Delivered', value: 25 },
    { label: 'Daily Users', value: 450 },
    { label: 'Code Reduction', value: 30 },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: ThemeService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Register GSAP plugins first
      try {
        gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);
        console.log('✅ GSAP plugins registered successfully');
      } catch (error) {
        console.error('❌ Error registering GSAP plugins:', error);
      }

      afterNextRender(() => {
        if (!isPlatformBrowser(this.platformId)) return;
        console.log('🔄 Initializing animations...');
        // Force scroll to top to ensure triggers work from start
        window.scrollTo(0, 0);

        try {
          // --- LENIS SMOOTH SCROLL ---
          this.initLenis().catch(console.error);

          // Use a longer timeout to ensure DOM is fully ready
          setTimeout(() => {
            this.initHero();
            this.initMagneticButton();
            this.initMarquee();
            // this.initParallax();
            this.initMarquee();
            this.initHorizontalScroll();
            this.initServices();
            this.initSwiper().catch(console.error);
            // this.initLottieAnimations().catch(console.error); // Lottie animations removed
            this.initTimeline();
            this.initStats();
            this.initFloatingElements();
            this.initScrollColorFade();
            this.initEnhancedAnimations(); // Enhanced GSAP animations
            this.initGradientEffects(); // Smooth gradients
            this.init3DEffects(); // 3D design elements
            this.initImageAnimations(); // Image animations
            this.initProfileAnimations(); // Profile section animations
            // this.initCustomCursor(); // Custom cursor effects removed
            this.initNeomorphism(); // Neomorphism effects

            // Recalculate ScrollTrigger positions after everything is set
            // Use requestAnimationFrame to ensure DOM is fully rendered
            requestAnimationFrame(() => {
              setTimeout(() => {
                try {
                  console.log('GSAP: Refreshing ScrollTrigger...');
                  ScrollTrigger.refresh();
                  ScrollTrigger.update();
                } catch (error) {
                  console.error('❌ Error refreshing ScrollTrigger:', error);
                }
              }, 200);
            });

            // Refresh Swiper if needed
            if (this.swiperInstance) {
              setTimeout(() => {
                this.swiperInstance?.update();
              }, 500);
            }
          }, 100);
        } catch (e) {
          console.error('❌ GSAP Error:', e);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Cleanup Lenis
        if (this.lenis) {
          this.lenis.destroy();
        }

        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Cleanup Swiper
        if (this.swiperInstance) {
          this.swiperInstance.destroy(true, true);
        }

        // Cleanup resize observer
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }

        // Kill all GSAP animations
        gsap.killTweensOf('*');
      } catch (error) {
        console.warn('Error during cleanup:', error);
      }
    }
  }

  private async initLenis() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Dynamically import Lenis to avoid SSR issues
    if (!this.LenisClass) {
      const lenisModule = await import('lenis');
      this.LenisClass = lenisModule.default;
    }
    // Initialize Lenis for smooth scrolling
    this.lenis = new this.LenisClass({
      lerp: 0.1, // Smoothness (0-1), lower is smoother
      wheelMultiplier: 1.2, // Scrolling speed
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (this.lenis) {
      this.lenis.on('scroll', () => {
        try {
          ScrollTrigger.update();
        } catch (error) {
          console.warn('ScrollTrigger update error:', error);
        }
      });
    }

    // Add Lenis's requestAnimationFrame to GSAP's ticker for best performance
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing to avoid jumps during heavy scroll
    gsap.ticker.lagSmoothing(0);
  }

  public scrollTo(target: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.lenis) {
      this.lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- PARALLAX EFFECT ---
  public onHeroMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Normalize mouse position (-1 to 1)
    const x = (clientX / windowWidth) * 2 - 1;
    const y = (clientY / windowHeight) * 2 - 1;

    // Animate background blobs
    gsap.to('.parallax-bg', {
      x: (i, target) => x * 50 * (Number(target.dataset.speed) || 0.1) * 100,
      y: (i, target) => y * 50 * (Number(target.dataset.speed) || 0.1) * 100,
      duration: 1.5,
      ease: 'power3.out',
      overwrite: 'auto', // Prevent conflicting tweens
    });

    // Animate Text slightly
    gsap.to('.parallax-text', {
      x: (i, target) => x * 30 * (Number(target.dataset.speed) || 0.05) * 50,
      y: (i, target) => y * 30 * (Number(target.dataset.speed) || 0.05) * 50,
      duration: 1.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }

  // --- MAGNETIC BUTTON ---
  private initMagneticButton() {
    if (!isPlatformBrowser(this.platformId)) return;
    const btn = this.magneticBtn?.nativeElement;
    if (!btn) return;

    // Use quickTo for high performance mouse tracking
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.8, ease: 'power4.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.8, ease: 'power4.out' });

    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      xTo(x * 0.5); // Strength
      yTo(y * 0.5);
    });

    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  }

  // --- INFINITE MARQUEE ---
  // private initMarquee() {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   // Horizontal endless loop
  //   gsap.to('.marquee-track', {
  //     xPercent: -50, // Move half way (since we doubled content)
  //     duration: 20,
  //     ease: 'none',
  //     repeat: -1,
  //     force3D: true, // Hardware acceleration
  //   });
  // }

  private initHero() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Set initial states
    gsap.set('.hero-label', { y: '100%', opacity: 1 });
    gsap.set('.hero-title span', { y: '100%', opacity: 1 });
    gsap.set('.hero-desc', { y: '100%', opacity: 1 });
    gsap.set('.hero-contact', { y: '100%', opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-label', {
      y: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.3
    })
      .to('.hero-title span', {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
      }, '-=0.7')
      .to('.hero-desc', {
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .to('.hero-contact', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.6');

    // Parallax effect for hero background images
    const heroBgs = document.querySelectorAll('.hero-bg-1, .hero-bg-2');
    heroBgs.forEach((bg: any) => {
      bg.addEventListener('mousemove', (e: MouseEvent) => {
        const speed = parseFloat(bg.dataset.speed || '0.05');
        const x = (e.clientX / window.innerWidth - 0.5) * 100 * speed;
        const y = (e.clientY / window.innerHeight - 0.5) * 100 * speed;
        gsap.to(bg, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out',
        });
      });
    });
  }

  private initManifesto() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Animate profile summary section
    const profileSection = document.querySelector('#about');
    if (profileSection) {
      // Animate achievement cards
      const achievementCards = document.querySelectorAll('.achievement-card');
      if (achievementCards.length > 0) {
        gsap.set(achievementCards, { opacity: 0, y: 50 });
        gsap.to(achievementCards, {
          scrollTrigger: {
            trigger: profileSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Animate skill badges
      const skillBadges = document.querySelectorAll('.skill-badge');
      if (skillBadges.length > 0) {
        // Set initial visible state
        gsap.set(skillBadges, { opacity: 1, scale: 1 });

        // Check if section is already in view
        const rect = profileSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          // Section is already visible, just ensure badges are shown
          gsap.set(skillBadges, { opacity: 1, scale: 1 });
        } else {
          // Animate on scroll
          gsap.from(skillBadges, {
            scrollTrigger: {
              trigger: profileSection,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          });
        }
      }

      // Animate profile icon
      const profileIcon = document.querySelector('.profile-icon-container');
      if (profileIcon) {
        gsap.set(profileIcon, { scale: 0, rotation: 0 });
        gsap.to(profileIcon, {
          scrollTrigger: {
            trigger: profileSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          scale: 1,
          rotation: 360,
          duration: 1,
          ease: 'back.out(1.7)',
        });
      }
    }

    // Animate main text with scroll scrub
    const aboutText = document.querySelector('#about p');
    if (aboutText) {
      gsap.set(aboutText, { opacity: 0.3, y: 30 });
      gsap.to(aboutText, {
        scrollTrigger: {
          trigger: aboutText,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
      });
    }
  }

  // --- HORIZONTAL SCROLL ---
  private initHorizontalScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = document.getElementById('process');
    const container = document.querySelector('.horizontal-container') as HTMLElement;

    if (!section || !container) {
      console.warn('⚠️ Process section or container not found');
      return;
    }

    // Wait for layout to be ready
    setTimeout(() => {
      try {
        // Calculate scroll amount properly
        const containerWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollAmount = Math.max(0, containerWidth - viewportWidth);

        if (scrollAmount <= 0) {
          console.warn('⚠️ No horizontal scroll needed');
          return;
        }

        // Kill any existing ScrollTrigger for this section
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars?.trigger === section) {
            trigger.kill();
          }
        });

        // Create horizontal scroll animation
        // Create horizontal scroll animation
        // Create horizontal scroll animation
        const horizontalAnimation = gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${(container.scrollWidth - window.innerWidth) * 1}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            markers: false,
          },
          force3D: true,
        });

        // Animate horizontal panels (Scaling effect instead of opacity for better visibility)
        const panels = document.querySelectorAll('.horizontal-panel');
        panels.forEach((panel: any, index: number) => {
          gsap.set(panel, { opacity: 1 }); // Ensure visible
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();
      } catch (error) {
        console.error('❌ Error initializing horizontal scroll:', error);
      }
    }, 300);
  }

  private initServices() {
    if (!isPlatformBrowser(this.platformId)) return;

    const servicesSection = document.querySelector('section[data-color="zinc"]');
    const serviceCards = document.querySelectorAll('.service-card');

    if (!servicesSection || serviceCards.length === 0) {
      console.warn('⚠️ Services section or cards not found');
      return;
    }

    // Set initial states
    gsap.set(serviceCards, { y: 50, opacity: 0 });

    // Animate service cards
    gsap.to(serviceCards, {
      scrollTrigger: {
        trigger: servicesSection,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out',
    });
  }

  private async initSwiper() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Dynamically import Swiper to avoid SSR issues
    if (!this.SwiperClass || !this.SwiperModules) {
      const [swiperModule, swiperModules] = await Promise.all([
        import('swiper'),
        import('swiper/modules'),
      ]);
      this.SwiperClass = swiperModule.Swiper;
      this.SwiperModules = swiperModules;
    }
    // Wait for DOM to be ready and ensure elements exist
    const initSwiperHelper = () => {
      const swiperEl =
        this.swiperContainer?.nativeElement || document.querySelector('.swiper-container');
      const wrapper = document.querySelector('.swiper-wrapper');
      const nextBtn = document.querySelector('.swiper-button-next-custom');
      const prevBtn = document.querySelector('.swiper-button-prev-custom');
      const paginationEl = document.querySelector('.swiper-pagination-custom');

      if (!swiperEl || !wrapper) {
        console.warn('⚠️ Swiper container or wrapper not found, retrying...', {
          swiperEl: !!swiperEl,
          wrapper: !!wrapper,
        });
        return false;
      }

      try {
        // Destroy existing instance if any
        if (this.swiperInstance) {
          try {
            this.swiperInstance.destroy(true, true);
          } catch (e) {
            console.warn('Error destroying previous swiper:', e);
          }
        }

        const swiperConfig: any = {
          modules: [
            this.SwiperModules.Navigation,
            this.SwiperModules.Pagination,
            this.SwiperModules.Autoplay,
          ],
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: true,
          grabCursor: true,
          loop: this.projects.length > 1,
          speed: 1000,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 'auto',
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 'auto',
              spaceBetween: 30,
            },
          },
          on: {
            init: (swiper: any) => {
              console.log(
                '✅ Swiper initialized successfully with',
                swiper.slides.length,
                'slides',
              );
              ScrollTrigger.refresh();
            },
            slideChange: () => {
              ScrollTrigger.refresh();
            },
          },
        };

        // Add navigation if buttons exist (optional)
        if (nextBtn && prevBtn) {
          swiperConfig.navigation = {
            nextEl: nextBtn as HTMLElement,
            prevEl: prevBtn as HTMLElement,
            disabledClass: 'swiper-button-disabled',
          };
        }

        // Add pagination if element exists (optional)
        if (paginationEl) {
          swiperConfig.pagination = {
            el: paginationEl as HTMLElement,
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
            renderBullet: (index: number, className: string) => {
              return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
            },
          };
        }

        this.swiperInstance = new this.SwiperClass(swiperEl, swiperConfig);

        // Enhanced 3D card effect on hover
        setTimeout(() => {
          this.init3DCardEffects();
          this.initMagneticButtons();
          this.initParallaxEffects();
          this.initMicroInteractions();
        }, 100);

        return true;
      } catch (error) {
        console.error('❌ Error initializing Swiper:', error);
        return false;
      }
    };

    // Try multiple times with increasing delays
    let attempts = 0;
    const maxAttempts = 8;
    const tryInit = () => {
      attempts++;
      const result = initSwiperHelper();
      if (!result && attempts < maxAttempts) {
        setTimeout(tryInit, 200 * attempts);
      } else if (!result && attempts >= maxAttempts) {
        console.error('❌ Failed to initialize Swiper after', maxAttempts, 'attempts');
      }
    };

    setTimeout(tryInit, 800);
  }

  private init3DCardEffects() {
    // Tilt effects removed
  }



  private initMagneticButtons() {
    if (!isPlatformBrowser(this.platformId)) return;
    const magneticButtons = document.querySelectorAll('.magnetic-btn, .magnetic-btn-nav');

    magneticButtons.forEach((btn: any) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        xTo(x * 0.3);
        yTo(y * 0.3);
      });

      btn.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  private initParallaxEffects() {
    if (!isPlatformBrowser(this.platformId)) return;
    const parallaxImages = document.querySelectorAll(
      '.parallax-img, .parallax-img-2, .parallax-img-3',
    );

    parallaxImages.forEach((img: any) => {
      img.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = img.closest('.project-card-3d')?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;

        gsap.to(img, {
          x: moveX,
          y: moveY,
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });
  }

  private initMicroInteractions() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Tag animations
    const tags = document.querySelectorAll('.tag-item');
    tags.forEach((tag: any) => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
          scale: 1.1,
          y: -4,
          boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Project slide animations on scroll
    gsap.utils.toArray('.project-slide').forEach((slide: any) => {
      ScrollTrigger.create({
        trigger: slide,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(slide, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
          });
        },
      });
    });

    // Title animation
    const projectTitle = document.querySelector('.project-title');
    if (projectTitle) {
      gsap.from(projectTitle, {
        scrollTrigger: {
          trigger: projectTitle,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }

  private initProjectAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Animate project content on slide change
    const projectContents = document.querySelectorAll('.project-content');

    projectContents.forEach((content: any, index: number) => {
      gsap.from(content.children, {
        scrollTrigger: {
          trigger: content,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: index * 0.1,
      });
    });
  }

  private initTimeline() {
    if (!isPlatformBrowser(this.platformId)) return;

    const timelineSection = document.querySelector('section[data-color="zinc"]');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!timelineSection || timelineItems.length === 0) {
      console.warn('⚠️ Timeline section or items not found');
      return;
    }

    // Set initial states
    gsap.set(timelineItems, { x: -50, opacity: 0 });

    // Create timeline animation
    gsap.to(timelineItems, {
      scrollTrigger: {
        trigger: timelineSection,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true,
      },
      x: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }

  private initStats() {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.utils.toArray('.count-up, .count-up-achievement').forEach((el: any) => {
      const val = parseInt(el.getAttribute('data-val') || el.getAttribute('data-value') || '0');
      const prefix = el.textContent.includes('+') ? '+' : '';
      const suffix = el.textContent.includes('%') ? '%' : '';

      gsap.to(el, {
        innerText: val,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: function () {
          el.textContent = prefix + Math.round(el.innerText) + suffix;
        },
      });
    });
  }

  // --- FLOATING ELEMENTS ---
  private initFloatingElements() {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.to('.float-element', {
      y: 'random(-40, 40)',
      x: 'random(-20, 20)',
      duration: 'random(8, 15)', // Slower, more ambient
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 2,
      force3D: true,
    });
  }

  // --- SCROLL COLOR FADE ---
  private initScrollColorFade() {
    if (!isPlatformBrowser(this.platformId)) return;
    const sections = document.querySelectorAll('[data-color]');
    const main = document.getElementById('main-wrapper');

    sections.forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => this.updateColor(main, section.dataset.color),
        onEnterBack: () => this.updateColor(main, section.dataset.color),
        // Add smoothing to prevent rapid toggling
        toggleActions: 'play none none reverse',
      });
    });
  }

  private updateColor(element: HTMLElement | null, colorTheme: string) {
    if (!element) return;

    if (colorTheme === 'light') {
      gsap.to(element, {
        backgroundColor: '#f1f5f9',
        color: '#09090b',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    } else {
      // Default dark (Zinc 950)
      gsap.to(element, {
        backgroundColor: '#09090b',
        color: '#e2e8f0',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  }

  // NEW: Enhanced GSAP animations across all sections
  private initEnhancedAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Animate sections (excluding hero which is already animated)
    const sectionsToAnimate = document.querySelectorAll('section:not(#hero-section):not([id="about"]):not([id="work"]):not([id="process"])');

    sectionsToAnimate.forEach((section: any, index: number) => {
      if (!section) return;

      // Set initial state
      gsap.set(section, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.05,
          });
        },
        once: true,
        invalidateOnRefresh: true,
      });
    });

    // Animate images with stagger effect
    gsap.utils.toArray('img').forEach((img: any, index: number) => {
      ScrollTrigger.create({
        trigger: img,
        start: 'top 90%',
        onEnter: () => {
          gsap.from(img, {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: (index % 5) * 0.1,
          });
        },
      });
    });

    // Animate horizontal panels with smooth entrance
    const processSection = document.getElementById('process');
    if (processSection) {
      const horizontalPanels = document.querySelectorAll('.horizontal-panel');
      horizontalPanels.forEach((card: any, index: number) => {
        if (!card) return;

        // Set initial state
        gsap.set(card, { opacity: 0, x: 50, scale: 0.95 });

        ScrollTrigger.create({
          trigger: processSection,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: index * 0.15,
            });
          },
          once: true,
          invalidateOnRefresh: true,
        });
      });
    }
  }

  // NEW: Smooth gradient effects throughout
  private initGradientEffects() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Animated gradient backgrounds
    const gradientElements = document.querySelectorAll('.bg-linear-to-r, .bg-linear-to-br');

    gradientElements.forEach((el: any) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, {
            backgroundPosition: '100% 50%',
            duration: 2,
            ease: 'power1.inOut',
          });
        },
      });
    });

    // Gradient text animations
    const gradientTexts = document.querySelectorAll('.bg-clip-text');

    gradientTexts.forEach((text: any) => {
      gsap.to(text, {
        backgroundPosition: '200% 50%',
        duration: 3,
        repeat: -1,
        ease: 'linear',
      });
    });
  }

  // NEW: 3D design effects (tilt removed)
  private init3DEffects() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Tilt effects removed - keeping only parallax effects

    // 3D parallax scroll effect
    gsap.utils.toArray('.parallax-img, .parallax-img-2, .parallax-img-3').forEach((img: any) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
        rotation: 2,
        ease: 'none',
      });
    });
  }

  // NEW: Image animations throughout the page
  private initImageAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Skills section images
    const skillImages = document.querySelectorAll('.skill-card-bg, .skill-header-img');
    skillImages.forEach((img: any, index: number) => {
      gsap.set(img, { scale: 0.8, opacity: 0, rotation: 0 });
      ScrollTrigger.create({
        trigger: img,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(img, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
          });
        },
        once: true,
      });
    });

    // Experience timeline images
    const expImages = document.querySelectorAll(
      '.experience-item-bg, .company-logo, .timeline-header-img',
    );
    expImages.forEach((img: any, index: number) => {
      const startX = index % 2 === 0 ? -30 : 30;
      gsap.set(img, { scale: 0.9, opacity: 0, x: startX });
      ScrollTrigger.create({
        trigger: img,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(img, {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
          });
        },
        once: true,
      });
    });

    // Skills background animation
    const skillsBg = document.querySelector('.skills-bg');
    if (skillsBg) {
      gsap.to(skillsBg, {
        scrollTrigger: {
          trigger: skillsBg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
        ease: 'none',
      });
    }

    // Experience background animation
    const expBg = document.querySelector('.experience-bg');
    if (expBg) {
      gsap.to(expBg, {
        scrollTrigger: {
          trigger: expBg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        x: -50,
        scale: 1.05,
        ease: 'none',
      });
    }

    // Floating animations for hero images
    const heroFloats = document.querySelectorAll('.hero-float-1, .hero-float-2');
    heroFloats.forEach((float: any, index: number) => {
      gsap.to(float, {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-20, 20)',
        duration: 'random(3, 5)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      });
    });
  }

  // NEW: Profile section animations
  private initProfileAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Animate profile background
    const profileBg = document.querySelector('.profile-bg');
    if (profileBg) {
      gsap.to(profileBg, {
        scrollTrigger: {
          trigger: profileBg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 50,
        scale: 1.1,
        ease: 'none',
      });
    }
  }

  // NEW: Custom Cursor Effects


  // NEW: Toggle Theme
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // NEW: Neomorphism Effects
  private initNeomorphism() {
    if (!isPlatformBrowser(this.platformId)) return;
    const neomorphicElements = document.querySelectorAll(
      '.neomorphic-button, .neomorphic-card, .neomorphic-nav',
    );

    neomorphicElements.forEach((el: any) => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('neomorphic-pressed');
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('neomorphic-pressed');
      });
    });
  }
  // NEW: Marquee Animation
  private initMarquee() {
    if (!isPlatformBrowser(this.platformId)) return;

    const track = document.querySelector('.marquee-track');
    if (!track) return;

    // Infinite loop animation
    gsap.to(track, {
      xPercent: -50, // Move half the width (one full set of items)
      ease: 'none',
      duration: 20, // 20s for a smooth, readable speed
      repeat: -1,
    });
  }
}
