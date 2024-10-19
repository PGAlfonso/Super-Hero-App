import { Component, inject } from '@angular/core';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { HeroSingleCardComponent } from '@components/common/hero-single-card/hero-single-card.component';
import { FormsModule } from '@angular/forms';
import { HeroListPaginatorComponent } from '@components/common/hero-list-paginator/hero-list-paginator.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroFormDrawerComponent } from '@components/common/hero-form-drawer/hero-form-drawer.component';
import { HeroFormComponent } from '@components/features/hero-form/hero-form.component';
import { UppercaseDirective } from '@directives/uppercase.directive';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    HeroSingleCardComponent, 
    FormsModule, 
    HeroListPaginatorComponent, 
    FontAwesomeModule,
    HeroFormDrawerComponent,
    HeroFormComponent,
    UppercaseDirective ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  public paginatedHeroes: Hero[] = [];
  public heroes: Hero[] = [];
  public filteredHeroes: Hero[] = [];
  public showFiltered: boolean = false;
  public showDrawer: boolean = false;
  public selectedHero: Hero | null = null;

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

  toggleDrawer():void{
    if(this.showDrawer){
      this.selectedHero = null;
    }
    this.showDrawer = !this.showDrawer;
  }

  onAddHero(hero: Hero): void {  
    this.toggleDrawer();
    if(hero.id === 0){
      this.heroStore.addHero(hero);
    }else{
      this.heroStore.updateHero(hero);
      this.selectedHero = null;
    }    
  }

  onEditHero(hero: Hero){    
    this.selectedHero = hero;
    this.toggleDrawer();
  }

  onDeleteHero(hero: Hero){
    this.heroStore.deleteHero(hero.id);
  }

  updatePagination(values: Hero[]){    
    this.paginatedHeroes = values;
  } 

}
