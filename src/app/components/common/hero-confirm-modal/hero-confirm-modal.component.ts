import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hero-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './hero-confirm-modal.component.html',
  styleUrl: './hero-confirm-modal.component.scss'
})
export class HeroConfirmModalComponent {
  public messagge = input.required<string>();
  public title = input.required<string>();
  public confirm = output<void>();
  public cancel = output<void>()

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
