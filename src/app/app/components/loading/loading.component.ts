import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  public isLoading$: Observable<boolean> = this.loadingService.loading;

  constructor(public loadingService: LoadingService) {}
}
