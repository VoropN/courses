import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Observable } from 'rxjs';
import { About } from '../../models';
import { retry, catchError } from 'rxjs/operators';
import { Api } from '../../environments/api';

@Injectable({
  providedIn: 'root'
})
export class AboutApiService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) { }

  public getAbout(): Observable<About> {
    return this.http.get<About>(Api.about).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleResponceError(error, 'Can\'t load about!'))
    );
  }
}
