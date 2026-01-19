import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-800 text-white py-2">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; 2026 Ankit Maurya. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
