import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  public showErrorNotification(errorMessage): void {
    this.messageService.showNotification(errorMessage, 'error', 'Close');
  }

  public handleResponceError(
    error: HttpErrorResponse,
    userErrorMessage: string
  ): Observable<never> {
    this.showErrorNotification(userErrorMessage);
    return EMPTY;
  }
}
