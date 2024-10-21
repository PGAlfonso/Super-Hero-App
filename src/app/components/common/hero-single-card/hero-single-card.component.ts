import { Component, input, output } from '@angular/core';
import { Hero } from '@interfaces/hero.interface';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { HeroConfirmModalComponent } from '@components/common/hero-confirm-modal/hero-confirm-modal.component';
import { Router } from '@angular/router';

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

  
  
  constructor(private router: Router, public  library: FaIconLibrary){
    library.addIcons(faEdit,faTrash, faEye)
  }

  onEdit(): void{    
    this.edit.emit(this.hero());
  }

  onDelete(): void{
    this.toggleModal();    
  }

  onCancel(): void {
    this.toggleModal();
  }

  onConfirm(): void {
    this.delete.emit(this.hero());
  }

  toggleModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }

  onViewDetail(): void{
    this.router.navigate([`/hero/${this.hero().id}`])
  }

}
