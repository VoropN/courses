import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditFormComponent } from './course-edit-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Course } from 'src/app/core/models';

const mockCourses: Course = {
  name: 'Magna excepteur aute deserunt9',
  description: 'Est minim ea sunt labor',
  createDate: '11/14/19',
  duration: 123,
  authors: 'Authour2',
  isDeleted: false,
  img: 'assets/course.svg',
};

describe('AddCourseComponent', () => {
  let component: CourseEditFormComponent;
  let fixture: ComponentFixture<CourseEditFormComponent>;
  let loc: Location;
  beforeEach(async(() => {
    loc = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [CourseEditFormComponent],
      providers: [
        FormBuilder,
        {
          provide: Location,
          useValue: loc,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancel()', () => {
    it('should return back', () => {
      const cancelButton = fixture.debugElement.query(
        By.css('.add-course__cancel')
      );
      cancelButton.triggerEventHandler('click', null);
      expect(loc.back).toHaveBeenCalled();
    });
  });

  describe('onSave()', () => {
    it('should save course', async (done) => {
      component.course = mockCourses;
      component.saveCourse.subscribe((course) => {
        expect(course).toEqual(mockCourses);
        done();
      });
      const saveButton = fixture.debugElement.query(
        By.css('.add-course__save')
      );
      saveButton.triggerEventHandler('click', null);
    });
  });

  it('should not save course', async () => {
    component.course = undefined;
    const saveCourse = spyOn(component.saveCourse, 'emit');
    const saveButton = fixture.debugElement.query(By.css('.add-course__save'));
    saveButton.triggerEventHandler('click', null);
    expect(saveCourse).not.toHaveBeenCalled();
  });
});
