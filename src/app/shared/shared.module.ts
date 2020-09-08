import { NgModule } from '@angular/core';
import { TimePipe } from './pipes';
import { NewDateDetectorDirective } from './directives/new-date-detector/new-date-detector.directive';


@NgModule({
  declarations: [TimePipe, NewDateDetectorDirective],
  exports: [TimePipe, NewDateDetectorDirective]
})
export class SharedModule { }
