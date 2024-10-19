import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-form-drawer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './hero-form-drawer.component.html',
  styleUrl: './hero-form-drawer.component.scss'
})
export class HeroFormDrawerComponent {  
  public isOpen = input<boolean>(false);
  public title = input<string>();
  public close = output<void>();

  constructor(public library: FaIconLibrary){
    library.addIcons(faClose);
  }

  toggle():void{
    this.close.emit();
  }
}
