import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  const spinnerSvc = inject(LoadingService);
  spinnerSvc.show();

  return next(req).pipe(finalize(() => spinnerSvc.hide()));
};
