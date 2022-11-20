import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingService: LoadingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [LoadingService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([LoadingService], (instance) => {
    loadingService = instance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader on isLoading$ = true', () => {
    loadingService.showSpinner();
    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('.loader'));
    expect(loaderEl).toBeTruthy();
  });

  it('should hide loader on isLoading$ = false', () => {
    loadingService.hideSpinner();
    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('.loader'));
    expect(loaderEl).toBeFalsy();
  });
});
