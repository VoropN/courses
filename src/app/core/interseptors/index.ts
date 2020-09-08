import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterseptor } from './api.interseptor';
import { LoadingInterseptor } from './loading.interseptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterseptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterseptor, multi: true }
];
