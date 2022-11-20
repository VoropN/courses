import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { CoursesApiService } from 'src/app/core/services/courses-api/courses-api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';

const mockCoursesServiceMethods = [
  'getCourses',
  'getCourseById',
  'deleteCourse',
  'postCourse',
  'updateCourse',
].reduce((acc, curr) => ({ ...acc, [curr]: of([]) }), {});

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
    service.searchParamsSubject = new BehaviorSubject({ _start: 0, _end: 3 });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call CoursesApiService\'s method "getCourses"', () => {
    service.getCourses();
    expect(coursesApiService.getCourses).toHaveBeenCalled();
  });
});
