import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UppercaseDirective } from './directives/uppercase.directive';
import { SpinnerComponent } from '@components/common/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FontAwesomeModule, UppercaseDirective, SpinnerComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public searchValue: string = '';
  public heroes: Hero[] = [];

  private heroStore = inject( HeroStore );
  private route = inject(Router);
  
  constructor(private library: FaIconLibrary){
    this.library.addIcons(faSearch);

    this.heroStore.heroes$.subscribe((heroes) => {
      if(this.searchValue !== ''){
        this.heroStore.searchHeroesByName(this.searchValue);
      }
    });
  }

  searchHero(){
    this.heroStore.searchHeroesByName(this.searchValue);    
  }
  
  returnHome(){
    this.route.navigate(['/home']);
  }
}
