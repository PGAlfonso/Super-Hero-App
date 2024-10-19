import { Component, input, output } from '@angular/core';
import { Hero } from '@interfaces/hero.interface';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HeroConfirmModalComponent } from '@components/common/hero-confirm-modal/hero-confirm-modal.component';

@Component({
  selector: 'app-hero-single-card',
  standalone: true,
  imports: [FontAwesomeModule, HeroConfirmModalComponent],
  templateUrl: './hero-single-card.component.html',
  styleUrl: './hero-single-card.component.scss'
})
export class HeroSingleCardComponent {
  public hero = input.required<Hero>();
  public edit = output<Hero>();
  public delete = output<Hero>();

  public showConfirmModal: boolean = false;
  
  constructor(library: FaIconLibrary){
    library.addIcons(faEdit,faTrash)
  }

  onEdit(): void{
    this.edit.emit(this.hero());
  }

  onDelete(): void{
    this.tooggleModal();    
  }

  onCancel(): void {
    this.tooggleModal();
  }

  onConfirm(): void {
    this.delete.emit(this.hero());
  }

  tooggleModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }


}
