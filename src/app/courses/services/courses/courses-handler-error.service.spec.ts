import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { CoursesApiService } from 'src/app/core/services/courses-api/courses-api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { access } from 'fs';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';

const mockCourse = {
  name: "Magna excepteur aute deserunt8",
  description:
  "Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
  createDate: "11/14/19",
  duration: 123,
  authors: "Authour2",
  id: 8
};

const error = throwError({ status: 404 });
const mockCoursesServiceMethods = {
  getCourses: error,
  deleteCourse: error,
  postCourse: error,
  updateCourse: error,
  getCourseById: error,
};

describe('CoursesService', () => {
  let service: CoursesService;
  let errorHandlerService: ErrorHandlerService;
  let messageService: MessageService;
  let coursesApiService: CoursesApiService;
  let router = class { navigate = jasmine.createSpy("navigate"); };

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['showNotification']);
    coursesApiService = jasmine.createSpyObj('CoursesApiService', mockCoursesServiceMethods);
    errorHandlerService = jasmine.createSpyObj('ErrorHandlerService', ['handleResponceError']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ErrorHandlerService,
          useValue: errorHandlerService
        },
        {
          provide: MessageService,
          useValue: messageService,
        },
        {
          provide: CoursesApiService,
          useValue: coursesApiService,
        },
        {
          provide: Router,
          useClass: router
        }
      ]
    });
    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should handler error', async() => {
    it('when call getCourses', () => {
      service.getCourses();
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });

    it('when call "getCourseById"', () => {
      const redirect = spyOn(service, 'redirectToCoursesPage');
      service.getCourseById(5).subscribe();
      expect(redirect).toHaveBeenCalled();
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });

    it('when call "deleteCourse"', () => {
      service.deleteCourse(mockCourse);
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });

    it('when call "postCourse"', () => {
      service.postCourse(mockCourse);
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });

    it('when call "updateCourse"', () => {
      service.updateCourse(mockCourse);
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });

    it('when call "getCoursesName"', () => {
      service.getCoursesName();
      expect(errorHandlerService.handleResponceError).toHaveBeenCalled();
    });
  });
});
