import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Course } from 'src/app/core/models';
import { By } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';

const searhcMethods = [
  'clearValue',
  'onSearch',
  'ngOnInit',
  'ngOnDestroy',
  'trackByItems',
];

const mockCourses: Course[] = [
  {
    name: 'Magna excepteur aute deserunt9',
    description: 'Est minim ea sunt',
    createDate: '11/14/19',
    duration: 123,
    authors: 'Authour2',
    id: 9,
  },
];

describe('SearchComponent', () => {
  let component: SearchComponent<any>;
  let fixture: ComponentFixture<SearchComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        NoopAnimationsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.searchParams = {
      name_like: 'name',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('trackByItems()', () => {
    it('should return id', async () => {
      mockCourses.forEach((course, i) => {
        const id = component.trackByItems(i, course);
        expect(id).toBe(course.id);
      });
    });
  });

  describe('clearValue()', () => {
    it('should clear search input', async (done) => {
      component.searchControl.valueChanges.subscribe((search: string) => {
        expect(search).toBe('');
        done();
      });
      const saveButton = fixture.debugElement.query(
        By.css('.search-field__clear')
      );
      saveButton.triggerEventHandler('click', null);
    });
  });

  describe('onSearch()', () => {
    it('should call search throw event enter', async (done) => {
      component.search.pipe(debounceTime(500)).subscribe((search: string) => {
        expect(search).toBe(component.searchParams.name_like);
        done();
      });
      const searchButton = fixture.debugElement.query(
        By.css('.search-field__input')
      );
      searchButton.triggerEventHandler('keydown.enter', null);
    });

    it('should call search throw params autocomplete', async (done) => {
      const searchParam = 'name';
      component.autocomplete = {
        activeOption: {
          viewValue: searchParam,
        },
        closePanel: () => { },
      } as MatAutocompleteTrigger;

      component.search.subscribe((search: string) => {
        expect(search).toBe(searchParam);
        done();
      });

      component.onSearch();
    });
  });
});
