import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNewDateDetector]'
})
export class NewDateDetectorDirective {

  @Input('appNewDateDetector') private date: string;

  @HostBinding('class.new-item') public get classNewItem(): boolean {
    const creationDateMilSec = Date.parse(this.date);
    return this.todayMilSec - creationDateMilSec <= this.daysToBeNewMilSec;
  }

  private daysToBeNew = 14;
  private daysToBeNewMilSec: number = this.daysToBeNew * 24 * 60 * 60 * 1000;
  private todayMilSec: number = Date.now();
}
