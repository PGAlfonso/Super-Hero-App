import { UppercaseDirective } from './uppercase.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {ComponentFixtureAutoDetect} from '@angular/core/testing';

// Componente de prueba para aplicar la directiva
@Component({
  standalone: true,
  template: `<input type="search" appUppercase>`,
  imports: [UppercaseDirective]
})

class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, UppercaseDirective],      
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();    
  });

  it('should convert input value to uppercase', async () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    // Configurar el valor del input
    inputElement.value = 'test';

    // Crear y despachar un evento de input que simule una interacción del usuario
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);

    await fixture.whenStable();

    // Verificar que el valor esté en mayúsculas y el cursor esté en la misma posición
    expect(inputElement.value).toBe('TEST');
  });

  it('should keep the cursor position after converting to uppercase', async () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
  
    // Configurar el valor del input y la posición del cursor
    inputElement.value = 'example';
    inputElement.setSelectionRange(3, 3);

    // Crear y despachar un evento de input que simule una interacción del usuario
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);

    await fixture.whenStable();

    // Verificar que el valor esté en mayúsculas y el cursor esté en la misma posición
    expect(inputElement.value).toBe('EXAMPLE');
    expect(inputElement.selectionStart).toBe(3);
    expect(inputElement.selectionEnd).toBe(3);
  });
});
