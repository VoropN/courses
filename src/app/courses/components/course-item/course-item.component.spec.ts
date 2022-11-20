import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';

const mockCourse = {
  name: 'Magna excepteur aute deserunt9',
  description: 'Est minim ea sunt',
  createDate: '11/14/19',
  duration: 123,
  authors: 'Authour2',
  isDeleted: false,
  img: 'assets/course.svg',
  id: 9,
};

describe('CourseComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CourseItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.item = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDelete()', () => {
    it('should delete course', async (done) => {
      component.toDelete.subscribe((course) => {
        expect(course).toEqual(mockCourse);
        done();
      });
      const saveButton = fixture.debugElement.query(
        By.css('.course-item__delete')
      );
      saveButton.triggerEventHandler('click', null);
    });
  });

  describe('onEdit()', () => {
    it('should delete course', async (done) => {
      component.toEdit.subscribe((course) => {
        expect(course).toEqual(mockCourse);
        done();
      });
      const saveButton = fixture.debugElement.query(
        By.css('.course-item__edit')
      );
      saveButton.triggerEventHandler('click', null);
    });
  });
});
