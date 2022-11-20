import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { SearchModule } from 'src/app/shared/search/search.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

const mockCourses = [
  {
    name: 'Magna excepteur aute deserunt16',
    description:
      'Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
    createDate: '11/14/19',
    duration: 123,
    authors: 'Authour2',
    id: 16,
  },
  {
    name: 'we',
    description: 'wer',
    createDate: '11/11/21',
    duration: 2,
    authors: 'dsa',
    id: 17,
  },
];
const mockCoursesServiceMethods = {
  getCourses: undefined,
  getCoursesName: undefined,
  deleteCourse: undefined,
  updateCourse: undefined,
  courses: mockCourses,
  coursesName: mockCourses,
  searchParamsSubject: {
    value: { _start: 0, _end: 3 },
  },
  courseDeletedState: [1],
};
describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: CoursesService;
  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    coursesService = jasmine.createSpyObj(
      'CoursesService',
      mockCoursesServiceMethods
    );
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [NoopAnimationsModule, SharedModule, SearchModule],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesService,
        },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch()', async () => {
    it('should call onSearch', () => {
      const onSearch = spyOn(component, 'onSearch');
      const searchEl = fixture.debugElement.query(By.css('app-search'));
      const searchStr = 'hello';
      searchEl.triggerEventHandler('search', searchStr);
      fixture.detectChanges();
      expect(onSearch).toHaveBeenCalledWith(searchStr);
      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('should call CoursesService\'s methods', () => {
      const searchEl = fixture.debugElement.query(By.css('app-search'));
      const searchStr = 'hello';
      searchEl.triggerEventHandler('search', searchStr);
      fixture.detectChanges();
      expect(coursesService.getCourses).toHaveBeenCalled();
      expect(coursesService.getCourses).toHaveBeenCalledTimes(2);
    });
  });

  describe('onSearchName()', async () => {
    it('should call onSearchName', () => {
      const onSearchName = spyOn(component, 'onSearchName');
      const searchEl = fixture.debugElement.query(By.css('app-search'));
      const searchStr = 'hello';
      searchEl.triggerEventHandler('searchName', searchStr);
      fixture.detectChanges();
      expect(onSearchName).toHaveBeenCalledWith(searchStr);
      expect(onSearchName).toHaveBeenCalledTimes(1);
    });

    it('should call CoursesService\'s methods', () => {
      const searchEl = fixture.debugElement.query(By.css('app-search'));
      const searchStr = 'hello';
      searchEl.triggerEventHandler('searchName', searchStr);
      fixture.detectChanges();
      expect(coursesService.getCoursesName).toHaveBeenCalled();
      expect(coursesService.getCoursesName).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDelete()', async () => {
    it('should call CoursesService\'s methods', () => {
      const course = mockCourses[0];
      component.onDelete(course);
      fixture.detectChanges();
      expect(coursesService.deleteCourse).toHaveBeenCalledWith(course);
      expect(coursesService.deleteCourse).toHaveBeenCalledTimes(1);
    });
  });

  describe('onEdit()', async () => {
    it('should call CoursesService\'s methods', () => {
      const course = mockCourses[0];
      component.onEdit(course);
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('showMoreCourses()', async () => {
    it('should call CoursesService\'s methods', () => {
      component.searchParams = new BehaviorSubject({ _start: 0, _end: 3 });
      component.showMoreCourses();
      fixture.detectChanges();
      expect(coursesService.getCourses).toHaveBeenCalled();
      expect(coursesService.getCourses).toHaveBeenCalledTimes(2);
    });

    it('should not call CoursesService\'s methods', () => {
      component.showMoreCourses();
      fixture.detectChanges();
      expect(coursesService.getCourses).toHaveBeenCalled();
      expect(coursesService.getCourses).toHaveBeenCalledTimes(1);
    });
  });

  describe('trackByCourses()', () => {
    it('should return id', async () => {
      mockCourses.forEach((course, i) => {
        const id = component.trackByCourses(i, course);
        expect(id).toBe(course.id);
      });
    });
  });

  describe('tryToShowButtonMore()', () => {
    it('should get boolean', async () => {
      component.searchParams = new BehaviorSubject({
        _start: 0,
        _end: mockCourses.length,
      });
      const isShowButtonMore = component.tryToShowButtonMore(mockCourses);
      expect(typeof isShowButtonMore).toBe('boolean');
    });
  });
});
