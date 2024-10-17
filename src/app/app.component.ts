import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroStore } from './store/hero-store.service';
import { Hero } from './interfaces/hero.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  heroes: Hero[] = [];
  showFiltered: boolean = false;
  filteredHeroes: Hero[] = [];
  heroName: string = '';

  constructor(private heroStore: HeroStore){}

  ngOnInit(): void {
    this.loadAllHeroes();
  }


  loadAllHeroes(): void{
    this.heroStore.loadHeroes();
    this.heroStore.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
      this.showFiltered = false;
    });
  }

  searchHeroByName(name: string): void {
    this.heroStore.searchHeroesByName(name);
    this.heroStore.filteredHeroes$.subscribe((heroes) => {
      this.filteredHeroes = heroes;
      this.showFiltered = true;
    })
  }

  addHero(): void {
    const newHero: Hero = { id: 0, name:"New Hero" };
    this.heroStore.addHero(newHero);
    this.showFiltered = false;
  }

  updateHero(hero: Hero): void {
    const updatedHero: Hero = {...hero, name: `${hero.name} Updated` };
    this.heroStore.updateHero(updatedHero);
    this.showFiltered = false;
  }

  deleteHero(hero:Hero): void {
    this.heroStore.deleteHero(hero.id);
    this.showFiltered = false;
  }

}
