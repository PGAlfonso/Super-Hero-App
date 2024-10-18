import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FontAwesomeModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private searchValue: string = '';
  public filteredHeroes: Hero[] = [];
  public showFiltered: boolean = false;
  




  
  private heroStore = inject( HeroStore );
  public library = inject( FaIconLibrary );

  constructor(){
    this.library.addIcons(faSearch);
  }

  searchHero(){
    this.heroStore.searchHeroesByName(this.searchValue);
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
