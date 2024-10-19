import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '@interfaces/hero.interface';

@Component({
  selector: 'app-hero-list-paginator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-list-paginator.component.html',
  styleUrl: './hero-list-paginator.component.scss'
})
export class HeroListPaginatorComponent {

  public heroes = input.required<Hero[]>();  
  public paginatedHeroes = output<Hero[]>();

  public itemsPerPageOptions: number[] = [1, 5, 10, 50, 100];
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: number = 1;  

  ngOnChanges(){
    this.updatePagination()
  }

  paginate(): void {
    const start: number = (this.currentPage - 1) * this.itemsPerPage;    
    const end: number = start + +this.itemsPerPage;
    this.paginatedHeroes.emit(this.heroes().slice(start, end));
  }

  updatePagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.heroes().length / this.itemsPerPage);
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
}
