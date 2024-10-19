import { Component, inject } from '@angular/core';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { HeroSingleCardComponent } from '@components/common/hero-single-card/hero-single-card.component';
import { FormsModule } from '@angular/forms';
import { HeroListPaginatorComponent } from '@components/common/hero-list-paginator/hero-list-paginator.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [HeroSingleCardComponent, FormsModule, HeroListPaginatorComponent, FontAwesomeModule ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  public paginatedHeroes: Hero[] = [];
  public heroes: Hero[] = [];
  public filteredHeroes: Hero[] = [];
  public showFiltered: boolean = false;

  public heroStore = inject( HeroStore );

  constructor(private library:FaIconLibrary){
    this.library.addIcons(faPlus);
  }
  
  ngOnInit(): void {
    this.loadAllHeroes();
  }

  loadAllHeroes(): void{    
    //subscripcion a los cambios de héroes generales y filtrados
    this.heroStore.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
      if (!this.showFiltered) {
        this.updatePagination(heroes);
      }
    });

    this.heroStore.filteredHeroes$.subscribe((filteredHeroes) => {
      this.filteredHeroes = filteredHeroes;
      this.showFiltered = filteredHeroes.length > 0;
      this.updatePagination(this.showFiltered ? filteredHeroes : this.heroes);
    });
  }

  onEditHero(heroId: Hero){
    console.log(heroId)
  }

  onDeleteHero(hero: Hero){
    this.heroStore.deleteHero(hero.id);
  }

  updatePagination(values: Hero[]){    
    this.paginatedHeroes = values;
  } 

  onAddHero(): void {
    const newHero: Hero = { id: 0, name:"A New Hero" };
    this.heroStore.addHero(newHero);
    console.log(this.heroes)
  }
}
