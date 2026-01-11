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
type LottieType = typeof import('lottie-web');

@Component({
  selector: 'app-home-modern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Custom Cursor -->
    <div class="custom-cursor" id="customCursor">
      <div class="cursor-dot"></div>
      <div class="cursor-outline"></div>
    </div>

    <div
      id="main-wrapper"
      class="bg-zinc-950 dark-mode-bg light-mode-bg min-h-screen text-slate-200 dark-mode-text light-mode-text font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden transition-colors duration-1000 ease-in-out"
      [class.dark-mode]="themeService.theme() === 'dark'"
      [class.light-mode]="themeService.theme() === 'light'"
    >
      <!-- FLOATING BACKGROUND ELEMENTS -->
      <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
            class="fixed top-0 left-0 w-full z-50 px-6 py-1 flex justify-between items-center backdrop-blur-xl glass-nav neomorphic-nav border-b dark-mode-nav light-mode-nav"
            [style.border-bottom-color]="themeService.theme() === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'"
            [style.color]="themeService.theme() === 'dark' ? '#f8fafc' : '#0f172a'"
      >
        <div
          class="text-xl font-black tracking-tighter cursor-pointer hover:scale-110 transition-transform gradient-text-primary cursor-pointer-link"
        >
          ANKIT MAURYA
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium">
          <a
            href="#about"
            (click)="scrollTo('#about')"
            class="hover:opacity-80 transition-all relative group cursor-pointer-link"
            [style.color]="themeService.theme() === 'dark' ? '#60a5fa' : '#2563eb'"
          >
            About
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
            ></span>
          </a>
          <a
            href="#work"
            (click)="scrollTo('#work')"
            class="hover:opacity-80 transition-all relative group cursor-pointer-link"
            [style.color]="themeService.theme() === 'dark' ? '#60a5fa' : '#2563eb'"
          >
            Projects
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
            ></span>
          </a>
          <a
            href="#contact"
            (click)="scrollTo('#contact')"
            class="hover:opacity-80 transition-all relative group cursor-pointer-link"
            [style.color]="themeService.theme() === 'dark' ? '#60a5fa' : '#2563eb'"
          >
            Contact
            <span
              class="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
            ></span>
          </a>
        </div>
        <div class="flex items-center gap-4">
          <!-- Theme Toggle Button with Neomorphism -->
        <button
            (click)="toggleTheme()"
            class="theme-toggle neomorphic-button glass-button w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer-button hover:scale-110"
            [attr.aria-label]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg *ngIf="themeService.theme() === 'dark'" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg *ngIf="themeService.theme() === 'light'" class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          <a
            href="mailto:mauryankit2615@gmail.com"
          #magneticBtn
            class="px-6 py-3 rounded-full border border-cyan-500/30 bg-linear-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest relative overflow-hidden group cursor-pointer-button hover:border-cyan-400/50 transition-all neomorphic-button-inverted glass-button"
        >
            <span class="relative z-10 group-hover:text-cyan-400 transition-colors duration-300"
              >Hire Me</span
          >
          <div
              class="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
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
          <div class="overflow-hidden mb-4">
            <p
              class="hero-label text-cyan-400 font-mono text-lg tracking-[0.2em] transform translate-y-full"
            >
              FRONTEND DEVELOPER
            </p>
          </div>

          <h1
            class="hero-title text-6xl md:text-[9rem] font-black leading-[0.9] tracking-tighter opacity-90"
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

          <div class="mt-8 overflow-hidden">
            <p
              class="hero-desc text-slate-300 max-w-4xl mx-auto leading-relaxed text-sm transform translate-y-full parallax-text will-change-transform"
              data-speed="0.01"
            >
              Results-driven Frontend Developer with 3 years of experience designing and developing responsive, high-performance web applications and enterprise-grade ERP dashboards. Expert in React.js, JavaScript, GSAP animations, and modern UI/UX design.
            </p>
          </div>

          <div class="mt-12 overflow-hidden flex flex-wrap justify-center gap-4">
            <a
              href="tel:+916386139226"
              class="px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all transform translate-y-full hero-contact"
            >
              +91 6386139226
            </a>
            <a
              href="mailto:mauryankit2615@gmail.com"
              class="px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-md text-sm font-medium hover:bg-purple-500/10 hover:border-purple-400/50 transition-all transform translate-y-full hero-contact"
            >
              mauryankit2615@gmail.com
            </a>
            <a
              href="https://ankitportfolio.site"
              target="_blank"
              class="px-6 py-3 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-md text-sm font-medium hover:bg-pink-500/10 hover:border-pink-400/50 transition-all transform translate-y-full hero-contact"
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
        class="py-10 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 overflow-hidden relative z-20   my-0 origin-center shadow-2xl"
      >
        <div class="marquee-track flex whitespace-nowrap will-change-transform">
          <div
            class="marquee-content flex gap-8 text-4xl md:text-6xl font-black uppercase text-zinc-950 items-center"
          >
            <span *ngFor="let item of [1, 2, 3, 4]"
              >React.js • JavaScript • GSAP • Tailwind CSS • Chart.js • Highcharts • HTML5 • CSS3 • TypeScript • Bootstrap • Responsive Design •
            </span>
          </div>
          <!-- Duplicate for seamless loop -->
          <div
            class="marquee-content flex gap-8 text-4xl md:text-6xl font-black uppercase text-zinc-950 items-center aria-hidden='true'"
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
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
          alt="Profile Background"
          class="absolute inset-0 w-full h-full object-cover opacity-5 profile-bg"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-linear-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>

        <div class="max-w-6xl mx-auto relative z-10">
          <!-- Header with Icon -->
          <div class="flex items-center justify-center gap-4 mb-12">
            <div class="w-16 h-16 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center profile-icon-container">
              <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 class="text-xs font-mono text-cyan-400 tracking-widest uppercase">Professional Summary</h2>
          </div>

          <!-- Main Summary Text with Icons -->
          <div class="relative">
            <div class="absolute -left-8 top-0 w-1 h-full bg-linear-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-20 hidden md:block"></div>
          <p
            #manifestoText
              class="text-2xl md:text-3xl lg:text-3xl font-semibold leading-tight text-slate-300 text-left relative"
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
                  <div class="text-sm text-slate-400 uppercase tracking-widest">Projects Delivered</div>
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
                  <div class="text-sm text-slate-400 uppercase tracking-widest">Years Experience</div>
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
                  <div class="text-sm text-slate-400 uppercase tracking-widest">Daily Users</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Skills with Icons -->
          <div class="mt-16">
            <h3 class="text-xl font-bold text-center mb-8 text-slate-300 flex items-center justify-center gap-2">
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
                <span class="text-sm text-slate-300">React.js</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span class="text-sm text-slate-300">GSAP</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span class="text-sm text-slate-300">UI/UX</span>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all skill-badge opacity-100">
                <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <span class="text-sm text-slate-300">Performance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- HORIZONTAL SCROLL SECTION (Philosophy/Process) -->
      <section
        id="process"
        class="h-screen overflow-hidden flex flex-col relative bg-slate-100 text-black"
        data-color="light"
      >
        <div class="absolute top-10 left-10 z-10">
          <h2 class="text-xs font-mono tracking-widest text-black/50">MY APPROACH</h2>
        </div>
        <div
          class="horizontal-container flex h-full items-center pl-20 overflow-x-visible will-change-transform"
        >
          <!-- Card 1 -->
          <div
            class="horizontal-panel w-[80vw] md:w-[60vw] h-[70vh] shrink-0 bg-linear-to-br from-cyan-50 to-white border border-cyan-200/50 p-12 rounded-3xl mr-10 flex flex-col justify-between shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group"
          >
            <div class="text-9xl font-black text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">01</div>
            <div>
              <h3 class="text-4xl font-bold mb-4 bg-linear-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Design Analysis</h3>
              <p class="text-lg text-slate-700">
                Converting complex Figma designs into pixel-perfect, responsive layouts with 95%+ design accuracy. Understanding UI/UX patterns and translating them into scalable code.
              </p>
            </div>
          </div>
          <!-- Card 2 -->
          <div
            class="horizontal-panel w-[80vw] md:w-[60vw] h-[70vh] shrink-0 bg-linear-to-br from-zinc-900 to-zinc-950 text-white p-12 rounded-3xl mr-10 flex flex-col justify-between shadow-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group"
          >
            <div class="text-9xl font-black text-purple-500/10 group-hover:text-purple-500/20 transition-colors">02</div>
            <div>
              <h3 class="text-4xl font-bold mb-4 flex items-center gap-3">
                <span class="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">React Development</span>
                <span class="text-cyan-400 text-sm font-normal">REACT • JS • TS</span>
              </h3>
              <p class="text-lg text-slate-300">
                Building reusable component libraries, implementing efficient state management with React hooks, and creating 30+ reusable UI components that reduce code duplication by 30%.
              </p>
            </div>
          </div>
          <!-- Card 3 -->
          <div
            class="horizontal-panel w-[80vw] md:w-[60vw] h-[70vh] shrink-0 bg-linear-to-br from-cyan-400 via-purple-400 to-pink-400 text-zinc-900 p-12 rounded-3xl mr-10 flex flex-col justify-between shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group"
          >
            <div class="text-9xl font-black text-black/20 group-hover:text-black/30 transition-colors">03</div>
            <div>
              <h3 class="text-4xl font-bold mb-4 text-zinc-900">Animation & Motion</h3>
              <p class="text-lg font-medium text-zinc-800">
                Implementing GSAP animations, interactive UI transitions, and engaging user experiences that make websites feel alive. Creating seamless, performant animations.
              </p>
            </div>
          </div>
          <!-- Card 4 -->
          <div
            class="horizontal-panel w-[80vw] md:w-[60vw] h-[70vh] shrink-0 bg-linear-to-br from-zinc-950 via-purple-950 to-zinc-950 text-white p-12 rounded-3xl mr-20 flex flex-col justify-between shadow-2xl border border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 group"
          >
            <div class="text-9xl font-black text-pink-500/10 group-hover:text-pink-500/20 transition-colors">04</div>
            <div>
              <h3 class="text-4xl font-bold mb-4 bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Performance & Optimization</h3>
              <p class="text-lg text-slate-400">
                Code splitting, lazy loading, asset optimization achieving 25% faster load times. Performance profiling, SEO best practices, and WCAG accessibility standards implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES / SKILLS GRID -->
      <section class="py-32 px-6 bg-zinc-950 relative overflow-hidden" data-color="zinc">
        <!-- Background Images -->
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3024&auto=format&fit=crop"
          alt="Skills Background"
          class="absolute top-0 left-0 w-full h-full object-cover opacity-5 skills-bg"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-linear-to-b from-transparent via-zinc-950/80 to-zinc-950"></div>
        
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
              <h2 class="text-5xl font-black bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Expertise</h2>
            </div>
            <p class="text-slate-400 max-w-xs text-right mt-4 md:mt-0">
              A curated stack for modern web development with 3+ years of experience.
            </p>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5"
          >
            <div
              *ngFor="let skill of skills; let i = index"
              class="service-card group glass-card neomorphic-card bg-zinc-950/80 backdrop-blur-sm p-10 hover:bg-zinc-900/90 transition-all duration-500 relative overflow-hidden"
              [attr.data-index]="i"
            >
              <!-- Background Image for each skill card -->
              <img
                [src]="'https://images.unsplash.com/photo-' + (1550000000 + i * 100000) + '?q=80&w=1000&auto=format&fit=crop'"
                [alt]="skill.title"
                class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-500 skill-card-bg"
                loading="lazy"
              />
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
              <p class="text-sm text-slate-400 leading-relaxed relative z-10 group-hover:text-slate-300 transition-colors">{{ skill.desc }}</p>
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
              <h2 class="text-xs font-mono text-cyan-400 tracking-widest mb-4 uppercase">SELECTED WORKS</h2>
              <div class="text-5xl md:text-7xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent project-title">
                Featured Projects
              </div>
            </div>
            <!-- Lottie Animation Placeholder -->
            <div class="hidden md:block w-32 h-32 project-lottie-container"></div>
          </div>
          <p class="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Showcasing 25+ production-quality websites with advanced animations, 3D effects, and micro-interactions. 
            Each project demonstrates expertise in React.js, GSAP animations, and modern UI/UX design principles.
          </p>
        </div>

        <div #swiperContainer class="swiper-container w-full h-[70vh] md:h-[85vh] px-6 relative z-10 perspective-1000" style="perspective: 1000px;">
          <div class="swiper-wrapper">
            <div
              *ngFor="let project of projects; let i = index"
              class="swiper-slide w-[90vw] md:w-[65vw] h-full relative group cursor-drag project-slide"
              [attr.data-index]="i"
            >
              <!-- 3D Card Container -->
              <div
                class="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl project-card-3d transition-all duration-700"
                style="transform-style: preserve-3d;"
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
                
                <!-- Lottie Animation Container -->
                <div class="absolute top-8 right-8 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 project-lottie" [attr.data-project]="i"></div>

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
                    class="text-slate-300 max-w-2xl mb-6 text-lg leading-relaxed project-desc transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200"
                  >
                    {{ project.desc }}
                  </p>

                  <!-- Full Description (Expandable) -->
                  <div class="mb-6 project-full-desc-container transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                    <p class="text-slate-400 text-sm leading-relaxed max-w-2xl">
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
            <h2 class="text-4xl md:text-5xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</h2>
          </div>

          <div class="relative border-l border-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 ml-6 md:ml-0 space-y-20">
            <div
              *ngFor="let job of experience; let i = index"
              class="relative pl-12 md:pl-0 md:flex md:gap-12 group timeline-item"
              [attr.data-index]="i"
            >
              <!-- Background Image for each experience -->
              <img
                [src]="'https://images.unsplash.com/photo-155128804' + (9 + i) + '-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'"
                [alt]="job.company"
                class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg experience-item-bg"
                loading="lazy"
              />
              
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
                    [src]="'https://images.unsplash.com/photo-1555949963-aa' + (79 + i * 10) + 'dcee981c?q=80&w=500&auto=format&fit=crop'"
                    [alt]="job.company"
                    class="w-12 h-12 rounded-full object-cover opacity-50 group-hover:opacity-100 transition-opacity company-logo hidden md:block"
                    loading="lazy"
                  />
                  <div>
                    <h5 class="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{{ job.company }}</h5>
                    <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{{ job.desc }}</p>
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
          <h2 class="text-xs font-mono text-cyan-400 tracking-widest mb-4 text-center uppercase">Education</h2>
          <h2 class="text-4xl font-black mb-20 text-center">Academic Background</h2>

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
      <section class="py-20 border-y border-white/5 bg-linear-to-b from-zinc-950 to-zinc-900/50" data-color="zinc">
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

        <p class="text-cyan-400 font-mono mb-6 tracking-widest">WHAT'S NEXT?</p>
        <h2
          class="text-6xl md:text-9xl font-black mb-12 tracking-tighter hover:tracking-wide transition-all duration-700 cursor-default bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          LET'S WORK<br />TOGETHER
        </h2>

        <div class="flex flex-col items-center gap-6 mb-12">
        <a
            href="mailto:mauryankit2615@gmail.com"
            class="px-10 py-5 bg-linear-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full text-lg hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)]"
        >
          Start a Project
        </a>
          <div class="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <a href="tel:+916386139226" class="hover:text-cyan-400 transition-colors">+91 6386139226</a>
            <span class="text-slate-600">•</span>
            <a href="mailto:mauryankit2615@gmail.com" class="hover:text-purple-400 transition-colors">mauryankit2615@gmail.com</a>
            <span class="text-slate-600">•</span>
            <a href="https://ankitportfolio.site" target="_blank" class="hover:text-pink-400 transition-colors">ankitportfolio.site</a>
          </div>
        </div>

        <footer
          class="mt-32 w-full border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center px-12 text-sm text-slate-500"
        >
          <div>© 2025 Ankit Maurya | Frontend Developer</div>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/Ankit100720000" target="_blank" class="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/ankit-maurya2000" target="_blank" class="hover:text-purple-400 transition-colors">LinkedIn</a>
            <a href="https://ankitportfolio.site" target="_blank" class="hover:text-pink-400 transition-colors">Portfolio</a>
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
        opacity: 0;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
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
        transform-style: preserve-3d;
      }
      .service-card:hover {
        transform: translateY(-4px) rotateX(2deg) rotateY(-2deg);
      }
      /* Enhanced shadow effects with gradients */
      .horizontal-panel {
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(6, 182, 212, 0.1);
      }
      .horizontal-panel:hover {
        box-shadow:
          0 30px 80px rgba(0, 0, 0, 0.4),
          0 0 60px rgba(168, 85, 247, 0.2);
      }
      /* 3D Project Card Effects */
      .project-card-3d {
        transform-style: preserve-3d;
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
        perspective: 1000px;
        transform-style: preserve-3d;
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
      /* 3D perspective for sections */
      .perspective-1000 {
        perspective: 1000px;
      }
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
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
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
    },
    {
      period: 'Oct 2023 – Mar 2025',
      role: 'Web Developer',
      company: 'Kashish Technology Pvt. Ltd.',
      location: 'Noida Sector 2',
      desc: 'Successfully delivered 15+ professional websites for clients across e-commerce, fashion, technology, and service industries. Developed pixel-perfect, responsive layouts using HTML5, CSS3, JavaScript, Bootstrap, and Tailwind CSS. Implemented GSAP animations and converted Figma designs into production-ready code with 95%+ design accuracy. Managed end-to-end deployment on Hostinger and GoDaddy hosting platforms.',
    },
    {
      period: 'Feb 2023 – Sep 2023',
      role: 'Web Developer',
      company: 'PSS Technoservices Pvt. Ltd.',
      location: 'Noida Sector 62',
      desc: 'Developed 10+ responsive, mobile-first websites using modern web technologies. Optimized website performance through image compression, minification, and caching strategies, reducing load times by 30%. Implemented accessibility standards (WCAG 2.1) ensuring inclusive web experiences. Collaborated with designers and project managers in agile sprints using Jira.',
    },
    {
      period: 'Feb 2023 – May 2023',
      role: 'Web Developer Intern',
      company: 'PSS Technoservices Pvt. Ltd.',
      location: 'Noida Sector 62',
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
            this.initManifesto();
            this.initHorizontalScroll();
            this.initServices();
            this.initSwiper().catch(console.error);
            this.initLottieAnimations().catch(console.error);
            this.initTimeline();
            this.initStats();
            this.initFloatingElements();
            this.initScrollColorFade();
            this.initEnhancedAnimations(); // Enhanced GSAP animations
            this.initGradientEffects(); // Smooth gradients
            this.init3DEffects(); // 3D design elements
            this.initImageAnimations(); // Image animations
            this.initProfileAnimations(); // Profile section animations
            this.initCustomCursor(); // Custom cursor effects
            this.initNeomorphism(); // Neomorphism effects

            // Recalculate ScrollTrigger positions after everything is set
            console.log('GSAP: Refreshing ScrollTrigger...');
            ScrollTrigger.refresh();

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
    if (this.lenis) {
      this.lenis.destroy();
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
    this.lenis.on('scroll', ScrollTrigger.update);

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
  private initMarquee() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Horizontal endless loop
    gsap.to('.marquee-track', {
      xPercent: -50, // Move half way (since we doubled content)
      duration: 20,
      ease: 'none',
      repeat: -1,
      force3D: true, // Hardware acceleration
    });
  }

  private initHero() {
    if (!isPlatformBrowser(this.platformId)) return;
    const tl = gsap.timeline();
    tl.to('.hero-label', { y: 0, duration: 1, ease: 'expo.out', delay: 0.2 })
      .to('.hero-title span', { y: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out' }, '-=0.8')
      .to('.hero-desc', { y: 0, duration: 1, ease: 'power3.out' }, '-=1')
      .to(
        '.hero-contact',
        { y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', opacity: 1 },
        '-=0.5',
      )
      .to('.hero-bg-1', { opacity: 0.1, scale: 1.1, duration: 2, ease: 'power2.out' }, '-=1.5')
      .to('.hero-bg-2', { opacity: 0.05, scale: 1.05, duration: 2, ease: 'power2.out' }, '-=1.5')
      .to(
        '.hero-float-1',
        {
          y: -20,
          x: 20,
          rotation: 360,
          opacity: 0.2,
          duration: 3,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        },
        '-=1',
      )
      .to(
        '.hero-float-2',
        {
          y: 20,
          x: -20,
          rotation: -360,
          opacity: 0.15,
          duration: 4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        },
        '-=1',
      );

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
      gsap.from('.achievement-card', {
        scrollTrigger: {
          trigger: profileSection,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

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
      gsap.from('.profile-icon-container', {
        scrollTrigger: {
          trigger: profileSection,
          start: 'top 85%',
        },
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }

    // Animate main text
    const el = document.querySelector('#about p');
    if (el) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 0.2,
        y: 50,
      });
    }
  }

  // --- HORIZONTAL SCROLL ---
  private initHorizontalScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const section = document.getElementById('process');
    const container = document.querySelector('.horizontal-container');

    if (section && container) {
      const scrollAmount = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollAmount + 1000}`, // Increased scroll duration for smoother feel
          pin: true,
          scrub: 1, // Smooth scrub
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
        force3D: true,
      });
    }
  }

  private initServices() {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.grid',
        start: 'top 85%', // Trigger slightly earlier
      },
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out', // Smoother easing
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
    if (!isPlatformBrowser(this.platformId)) return;
    const projectCards = document.querySelectorAll('.project-card-3d');

    projectCards.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    });
  }

  private async initLottieAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Dynamically import lottie to avoid SSR issues
    if (!this.lottieLib) {
      const lottieModule = await import('lottie-web');
      this.lottieLib = lottieModule.default;
    }
    // Initialize Lottie animations for projects
    const lottieContainers = document.querySelectorAll('.project-lottie');

    // Sample Lottie animation URLs from Iconscout (you can replace with actual Iconscout URLs)
    const lottieUrls = [
      'https://assets5.lottiefiles.com/packages/lf20_animation1.json',
      'https://assets5.lottiefiles.com/packages/lf20_animation2.json',
      'https://assets5.lottiefiles.com/packages/lf20_animation3.json',
      'https://assets5.lottiefiles.com/packages/lf20_animation4.json',
      'https://assets5.lottiefiles.com/packages/lf20_animation5.json',
      'https://assets5.lottiefiles.com/packages/lf20_animation6.json',
    ];

    lottieContainers.forEach((container: any, index: number) => {
      if (container && !container.hasAttribute('data-lottie-init')) {
        container.setAttribute('data-lottie-init', 'true');

        try {
          this.lottieLib.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: lottieUrls[index % lottieUrls.length], // Use modulo for cycling
          });
        } catch (error) {
          console.warn('Lottie animation failed to load:', error);
        }
      }
    });

    // Header Lottie animation
    const headerLottie = document.querySelector('.project-lottie-container');
    if (headerLottie && !headerLottie.hasAttribute('data-lottie-init')) {
      headerLottie.setAttribute('data-lottie-init', 'true');
      try {
        this.lottieLib.loadAnimation({
          container: headerLottie,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets5.lottiefiles.com/packages/lf20_portfolio.json',
        });
      } catch (error) {
        console.warn('Header Lottie animation failed to load:', error);
      }
    }
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
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.space-y-20',
        start: 'top 75%',
      },
      x: -30,
      opacity: 0,
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
    // Animate all sections with scroll triggers
    gsap.utils.toArray('section').forEach((section: any, index: number) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.1,
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

    // Animate cards with 3D rotation
    gsap.utils.toArray('.service-card, .horizontal-panel, .timeline-item').forEach((card: any) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(card, {
            rotationY: 15,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    });
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

  // NEW: 3D design effects
  private init3DEffects() {
    if (!isPlatformBrowser(this.platformId)) return;
    // 3D tilt effect on hover for cards
    const cards3D = document.querySelectorAll('.project-card-3d, .service-card, .horizontal-panel');

    cards3D.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          transformOrigin: 'center center',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    });

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
      ScrollTrigger.create({
        trigger: img,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(img, {
            scale: 0.8,
            opacity: 0,
            rotation: 10,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
          });
        },
      });
    });

    // Experience timeline images
    const expImages = document.querySelectorAll(
      '.experience-item-bg, .company-logo, .timeline-header-img',
    );
    expImages.forEach((img: any, index: number) => {
      ScrollTrigger.create({
        trigger: img,
        start: 'top 90%',
        onEnter: () => {
          gsap.from(img, {
            scale: 0.9,
            opacity: 0,
            x: index % 2 === 0 ? -30 : 30,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
          });
        },
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
  private initCustomCursor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cursor = document.getElementById('customCursor');
    const cursorDot = cursor?.querySelector('.cursor-dot');
    const cursorOutline = cursor?.querySelector('.cursor-outline');

    if (!cursor || !cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position with smooth animation
    const updateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });

      gsap.set(cursorOutline, {
        x: outlineX,
        y: outlineY,
      });

      requestAnimationFrame(updateCursor);
    };

    // Mouse move handler
    document.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Cursor interactions with interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .cursor-pointer-button, .cursor-pointer-link, .swiper-slide, .project-card-3d, .service-card, .magnetic-btn, .neomorphic-button',
    );

    interactiveElements.forEach((el: any) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
        gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
        cursor?.classList.add('cursor-hover');
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorDot, { scale: 1, duration: 0.3 });
        gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
        cursor?.classList.remove('cursor-hover');
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      gsap.to(cursorDot, { scale: 0.8, duration: 0.1 });
      gsap.to(cursorOutline, { scale: 0.9, duration: 0.1 });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(cursorDot, { scale: 1, duration: 0.1 });
      gsap.to(cursorOutline, { scale: 1, duration: 0.1 });
    });

    // Hide cursor on mouse leave window
    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    });

    updateCursor();
  }

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
}
