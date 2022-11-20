import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { CoursesApiService } from 'src/app/core/services/courses-api/courses-api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';

const mockCourse = {
  name: 'Magna excepteur aute deserunt8',
  description:
    'Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
  createDate: '11/14/19',
  duration: 123,
  authors: 'Authour2',
  id: 8,
};
const mockCoursesServiceMethods = {
  getCourses: of([mockCourse]),
  deleteCourse: of(mockCourse),
  postCourse: of(mockCourse),
  updateCourse: of(mockCourse),
  getCourseById: of(mockCourse),
  searchParamsSubject: new BehaviorSubject({ _start: 0, _end: 5 }),
};

describe('CoursesService', () => {
  let service: CoursesService;
  let messageService: MessageService;
  let coursesApiService: CoursesApiService;

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', [
      'showNotification',
    ]);
    coursesApiService = jasmine.createSpyObj(
      'CoursesApiService',
      mockCoursesServiceMethods
    );
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ErrorHandlerService,
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
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });
    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call CoursesApiService\'s method "getCourses"', () => {
    service.getCourses();
    expect(coursesApiService.getCourses).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "getCourseById"', () => {
    service.getCourseById(5);
    expect(coursesApiService.getCourseById).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "deleteCourse"', () => {
    service.searchParamsSubject = new BehaviorSubject({ _start: 0, _end: 5 });
    service.deleteCourse(mockCourse);
    expect(coursesApiService.deleteCourse).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "deleteCourse"', () => {
    service.deleteCourse(mockCourse);
    expect(coursesApiService.deleteCourse).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "postCourse"', () => {
    service.postCourse(mockCourse);
    expect(coursesApiService.postCourse).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "updateCourse"', () => {
    service.updateCourse(mockCourse);
    expect(coursesApiService.updateCourse).toHaveBeenCalled();
  });

  it('should call CoursesApiService\'s method "getCoursesName"', () => {
    service.getCoursesName();
    expect(coursesApiService.getCourses).toHaveBeenCalled();
  });
});
