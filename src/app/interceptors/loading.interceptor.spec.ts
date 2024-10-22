import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoadingService } from '@services/loading.service';
import { loadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([loadingInterceptor])
        ),
        provideHttpClientTesting(),
        LoadingService,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);

    // Espiar los métodos `show` y `hide` del LoadingService
    spyOn(loadingService, 'show').and.callThrough();
    spyOn(loadingService, 'hide').and.callThrough();
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes
    httpTestingController.verify();
  });

  it('should call show and hide on LoadingService', () => {
    // Realizar una solicitud HTTP de ejemplo
    const httpClient = TestBed.inject(HttpClient);
    httpClient.get('/test').subscribe();

    // Verificar que el spinner se muestre al iniciar la solicitud
    expect(loadingService.show).toHaveBeenCalled();

    // Resolver la solicitud simulada
    const req = httpTestingController.expectOne('/test');
    req.flush({});

    // Verificar que el spinner se oculte cuando la solicitud termine
    expect(loadingService.hide).toHaveBeenCalled();
  });
});
