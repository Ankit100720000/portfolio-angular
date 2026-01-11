import { Component, signal, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Observer } from 'gsap/Observer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  template: `
    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('lern');

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(
        ScrollTrigger,
        ScrollToPlugin,
        TextPlugin,
        Flip,
        Draggable,
        MotionPathPlugin,
        Observer,
      );
    });
  }
}
