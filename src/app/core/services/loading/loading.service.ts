import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: Subject<boolean> = new Subject();
  public loading: Observable<boolean> = this.loadingSubject.asObservable();

  public showSpinner(): void {
    this.loadingSubject.next(true);
  }

  public hideSpinner(): void {
    this.loadingSubject.next(false);
  }
}
