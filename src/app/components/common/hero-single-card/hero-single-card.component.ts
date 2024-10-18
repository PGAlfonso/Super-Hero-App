import { Component, input, output } from '@angular/core';
import { Hero } from '@interfaces/hero.interface';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-single-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './hero-single-card.component.html',
  styleUrl: './hero-single-card.component.scss'
})
export class HeroSingleCardComponent {
  public hero = input.required<Hero>();
  public edit = output<Hero>();
  public delete = output<Hero>();
  
  constructor(library: FaIconLibrary){
    library.addIcons(faEdit,faTrash)
  }

  onEdit(){
    this.edit.emit(this.hero());
  }

  onDelete(){
    this.delete.emit(this.hero());
  }


}
