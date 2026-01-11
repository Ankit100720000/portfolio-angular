import { Routes } from '@angular/router';
import { HomeModernComponent } from './pages/home-modern/home-modern';

export const routes: Routes = [
  { path: '', component: HomeModernComponent },
  { path: '**', redirectTo: '' },
];
