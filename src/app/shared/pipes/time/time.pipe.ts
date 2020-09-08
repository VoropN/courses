import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  public transform(value: number): string {
    const hours = Math.floor(value / 60);
    const formatHours = this.padStart(hours);
    const formatMinutes = this.padStart(value - hours * 60);
    return `${formatHours}h ${formatMinutes}min`;
  }

  private padStart(value: number): string {
    return String(value).padStart(2, '0');
  }
}
