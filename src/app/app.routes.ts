import { Routes } from '@angular/router';
import { HeroListComponent } from './components/features/hero-list/hero-list.component';
import { HeroDetailsComponent } from '@components/features/hero-details/hero-details.component';

export const routes: Routes = [
    { path: 'home', component: HeroListComponent, data: { animation: 'HomePage'}},
    { path: 'hero/:id', component: HeroDetailsComponent, data: { animation: 'DetailPage'}},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
