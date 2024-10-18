import { Component, inject } from '@angular/core';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { HeroSingleCardComponent } from '@components/common/hero-single-card/hero-single-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [HeroSingleCardComponent, FormsModule ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  public heroStore = inject( HeroStore );
  public heroes: Hero[] = [];
  public paginatedHeroes: Hero[] = [];
  public filteredHeroes: Hero[] = [];
  public displayedColumns: string[] = ['name'];
  public showFiltered: boolean = false;

  // Paginación
  public itemsPerPageOptions: number[] = [5, 10, 50, 100];
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: number = 1;

  ngOnInit(): void {
    this.loadAllHeroes();
    this.updatePagination();
  }

  loadAllHeroes(): void{
    this.heroStore.loadHeroes();
    this.heroStore.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  onEditHero(heroId: Hero){
    console.log(heroId)
  }

  onDeleteHero(heroId: Hero){
    console.log(heroId);
  }

  paginate(): void {
    const start: number = (this.currentPage - 1) * this.itemsPerPage;    
    const end: number = start + +this.itemsPerPage;
    console.log(start, end)
    this.paginatedHeroes = this.heroes.slice(start, end);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.heroes.length / this.itemsPerPage);
    this.paginate();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  updateItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  onAddHero(){}
}
