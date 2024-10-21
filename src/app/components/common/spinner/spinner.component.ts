import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { HeroStore } from '@store/hero-store.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  private readonly heroStore = inject(HeroStore);
  private readonly spinnerSvc = inject(LoadingService);

  //isLoading$ = this.spinnerSvc.isLoading && 
  isLoading$ = this.heroStore.select( state=> state.isLoading);
}
