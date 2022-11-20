import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { AboutService } from '../../services/about/about.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AboutApiService } from 'src/app/core/services/about-api/about-api.service';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutService: AboutService;

  beforeEach(async(() => {
    aboutService = jasmine.createSpyObj('AboutService', {
      getAbout: of({ text: 'about text' }),
    });
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [
        {
          provide: AboutService,
          useValue: aboutService,
          deps: [AboutApiService],
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have text received from the server', () => {
    const aboutEl = fixture.debugElement.query(By.css('.about'));
    fixture.detectChanges();
    expect(aboutEl.nativeElement.textContent).toContain('about text');
  });

  it('should call AboutService\'s method "getAbout"', () => {
    expect(aboutService.getAbout).toHaveBeenCalled();
  });
});
