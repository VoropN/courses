import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { MessageService } from '../message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import { Observable } from 'rxjs';

describe('ErrorHandlerService', () => {
  let messageService: jasmine.SpyObj<MessageService>;
  let service: ErrorHandlerService;

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['showNotification']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: messageService,
        }
      ]
    });
    service = TestBed.get(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showErrorNotification()', async () => {
    const error = new HttpErrorResponse({ error: 'any' });
    const userErrorMessage = 'Something went wrong';

    it('should will called when is called handleResponceError', () => {
      const showErrorNotification = spyOn(service, 'showErrorNotification');
      service.handleResponceError(error, userErrorMessage);
      expect(showErrorNotification).toHaveBeenCalledWith(userErrorMessage);
    });

    it('should call MessageService\'s method "showNotification"', () => {
      service.showErrorNotification(userErrorMessage);
      expect(messageService.showNotification).toHaveBeenCalled();
    });
  });

  describe('handleResponceError()', async () => {
    const error = new HttpErrorResponse({ error: 'any' });
    const userErrorMessage = 'Something went wrong';

    it('should throw error when it calls', () => {
      service.handleResponceError(error, userErrorMessage).subscribe(
        data => fail(data),
        errorHTTP => expect(errorHTTP).toBe(error)
      )
    });
  });
});
