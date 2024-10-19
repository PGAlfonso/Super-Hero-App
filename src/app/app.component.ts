import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UppercaseDirective } from './directives/uppercase.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FontAwesomeModule, UppercaseDirective ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public searchValue: string = '';
  private heroStore = inject( HeroStore );
  
  constructor(private library: FaIconLibrary){
    this.library.addIcons(faSearch);
    //this.heroStore.loadHeroes();
  }

  searchHero(){
    this.heroStore.searchHeroesByName(this.searchValue);    
  }



  


  

  searchHeroByName(name: string): void {
    this.heroStore.searchHeroesByName(name);
    this.heroStore.filteredHeroes$.subscribe((heroes) => {
      //this.filteredHeroes = heroes;
      //this.showFiltered = true;
    })
  }

  

  updateHero(hero: Hero): void {
    const updatedHero: Hero = {...hero, name: `${hero.name} Updated` };
    this.heroStore.updateHero(updatedHero);
    //this.showFiltered = false;
  }
}
