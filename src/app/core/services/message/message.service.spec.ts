import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('MessageService', () => {
  let serviceMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    serviceMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [{
        provide: MatSnackBar,
        useValue: serviceMatSnackBar,
      }]
    });
  });

  it('should be created ', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  describe('showNotification', () => {
    it('should call method MatSnackBar\'s method "open"', () => {
      const service: MessageService = TestBed.get(MessageService);
      const message = 'Courses not found!';
      const button = 'Ok';
      const type = 'error';
      service.showNotification(message, type, button);

      expect(serviceMatSnackBar.open).toHaveBeenCalledWith(message, button, {
        duration: 10000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['notify', `notify-${type}`]
      });
    });
  });
});
