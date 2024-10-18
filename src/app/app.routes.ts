import { Routes } from '@angular/router';
import { HeroListComponent } from './components/features/hero-list/hero-list.component';

export const routes: Routes = [
    { path: 'home', component: HeroListComponent, data: { animation: 'HomePage'}},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
