import { Injectable } from '@angular/core';
import { AboutApiService } from 'src/app/core/services/about-api/about-api.service';
import { Observable } from 'rxjs';
import { About } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private aboutApiService: AboutApiService) {}

  public getAbout(): Observable<About> {
    return this.aboutApiService.getAbout();
  }
}
