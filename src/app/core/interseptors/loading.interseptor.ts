import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';

@Injectable()
export class LoadingInterseptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showSpinner();
    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      tap(() => this.loadingService.hideSpinner()),
    );
  }
}
