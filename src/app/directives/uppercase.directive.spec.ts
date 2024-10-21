import { UppercaseDirective } from './uppercase.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Componente de prueba para aplicar la directiva
@Component({
  template: `<input type="text" appUppercase>`
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should convert input value to uppercase', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('TEST');
  });

  it('should keep the cursor position after converting to uppercase', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElement.value = 'example';
    
    // Set cursor position to middle of the word
    inputElement.setSelectionRange(3, 3);
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // The value should be uppercase and cursor should still be at the correct position
    expect(inputElement.value).toBe('EXAMPLE');
    expect(inputElement.selectionStart).toBe(3);
    expect(inputElement.selectionEnd).toBe(3);
  });
});
