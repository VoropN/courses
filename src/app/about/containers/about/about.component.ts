import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AboutService } from '../../services/about/about.service';
import { Observable } from 'rxjs';
import { About } from 'src/app/core/models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

  public about$: Observable<About> = this.aboutService.getAbout();

  constructor(private aboutService: AboutService) {}
}
