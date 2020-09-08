import { TestBed } from '@angular/core/testing';

import { AboutService } from './about.service';
import { AboutApiService } from 'src/app/core/services/about-api/about-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AboutService', () => {
  let aboutApiService: jasmine.SpyObj<AboutApiService>;
  let service: AboutService;

  beforeEach(() => {
    aboutApiService = jasmine.createSpyObj('AboutApiService', ['getAbout']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{
        provide: AboutApiService,
        useValue: aboutApiService,
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.get(AboutService);
  });

  it('should be created', () => {
    const service: AboutService = TestBed.get(AboutService);
    expect(service).toBeTruthy();
  });

  describe('getAbout()', () => {
    it('should call aboutApiService\'s method "getAbout"', () => {
      service.getAbout();
      expect(aboutApiService.getAbout).toHaveBeenCalled();
    });
  });
});
