import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with isLoading set to false', () => {
    expect(service.isLoading()).toBeFalse(); // Verifica que isLoading inicie en false
  });

  it('should set isLoading to true when show is called', () => {
    service.show();
    expect(service.isLoading()).toBeTrue(); // Verifica que isLoading sea true tras llamar a show
  });

  it('should set isLoading to false when hide is called', () => {
    service.show(); // Primero se muestra
    service.hide(); // Luego se oculta
    expect(service.isLoading()).toBeFalse(); // Verifica que isLoading sea false tras llamar a hide
  });
});
