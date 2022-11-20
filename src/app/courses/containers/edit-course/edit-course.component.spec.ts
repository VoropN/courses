import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseComponent } from './edit-course.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from 'src/app/core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

const mockCourse: Course = {
  name: 'Magna excepteur aute deserunt16',
  description:
    'Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
  createDate: '11/14/19',
  duration: 123,
  authors: 'Authour2',
  id: 16,
};

const coursesServiceMethods = {
  updateCourse: of(mockCourse),
  getCourseById: of(mockCourse),
};

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let coursesService: CoursesService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj(
      'CoursesService',
      coursesServiceMethods
    );
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', {
      params: of({ id: mockCourse.id }),
    });
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: mockCourse.id }),
            },
          },
        },
        {
          provide: CoursesService,
          useValue: coursesService,
        },
      ],
      declarations: [EditCourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update course', () => {
    const updateCourseSpy = spyOn(component, 'updateCourse');
    const el = fixture.debugElement.query(By.css('app-course-edit-form'));
    el.triggerEventHandler('saveCourse', mockCourse);
    expect(updateCourseSpy).toHaveBeenCalledWith(mockCourse);
    expect(updateCourseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CoursesService\'s method updateCourse', () => {
    const el = fixture.debugElement.query(By.css('app-course-edit-form'));
    el.triggerEventHandler('saveCourse', mockCourse);
    expect(coursesService.updateCourse).toHaveBeenCalled();
    expect(coursesService.updateCourse).toHaveBeenCalledTimes(1);
  });
});
