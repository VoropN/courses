import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { By } from '@angular/platform-browser';
import { Course } from 'src/app/core/models';

const mockNewCourse: Course = {
  name: 'Magna excepteur aute deserunt9',
  description:
    'Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
  createDate: '11/14/19',
  duration: 123,
  authors: 'Authour2',
  isDeleted: false,
  img: 'assets/course.svg',
};

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let service: jasmine.SpyObj<CoursesService>;

  beforeEach(async(() => {
    service = jasmine.createSpyObj('CoursesService', ['postCourse']);
    TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      providers: [
        {
          provide: CoursesService,
          useValue: service,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('postCourse()', () => {
    it('should call method postCourse', () => {
      const postMethod = spyOn(component, 'postCourse');
      const formEl = fixture.debugElement.query(By.css('app-course-edit-form'));
      formEl.triggerEventHandler('saveCourse', mockNewCourse);
      fixture.detectChanges();
      expect(postMethod).toHaveBeenCalled();
    });

    it('should call courseService\'s method when received event 'saveCourse"', () => {
      const formEl = fixture.debugElement.query(By.css('app-course-edit-form'));
    formEl.triggerEventHandler('saveCourse', mockNewCourse);
    fixture.detectChanges();
    expect(service.postCourse).toHaveBeenCalledWith(mockNewCourse);
  });
});
});
