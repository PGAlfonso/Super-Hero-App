import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should initialize with isLoading set to false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should set isLoading to true when show() is called', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to false when hide() is called', () => {
    service.show(); // Primero lo activamos
    service.hide(); // Luego lo desactivamos
    expect(service.isLoading()).toBe(false);
  });
});
