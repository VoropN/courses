import { TestBed, async } from '@angular/core/testing';
import { AboutApiService } from './about-api.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError, defer } from 'rxjs';
import { About } from '../../models';
import { Api } from '../../environments';
import { error } from 'protractor';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('AboutApiService', () => {
  let service;
  let errorHandlerService: jasmine.SpyObj<ErrorHandlerService>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    errorHandlerService = jasmine.createSpyObj('ErrorHandlerService', [
      'handleResponceError',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ErrorHandlerService,
          useValue: errorHandlerService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(AboutApiService);
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {});

  it('should be created', () => {
    const service: AboutApiService = TestBed.get(AboutApiService);
    expect(service).toBeTruthy();
  });

  describe('getAbout()', () => {
    it('should call', () => {
      const mockAbout: About = {
        text: 'About page',
      };
      service.getAbout().subscribe((about: About) => {
        expect(about).toEqual(mockAbout);
      });

      const mockReq = httpMock.expectOne(Api.about);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAbout);

      httpMock.verify();
    });

    it('should send error from http to ErrorHandlerService', () => {
      const errorResponse = new HttpErrorResponse({
        error: '404 error',
        status: 404,
        statusText: 'Not Found',
      });
      spyOn(httpClient, 'get').and.returnValues(throwError(errorResponse));
      service.getAbout().subscribe();
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });
  });
});
