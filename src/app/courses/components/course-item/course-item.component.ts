import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Course } from '../../../core/models';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() public item: Course;
  @Output() public toDelete: EventEmitter<Course> = new EventEmitter();
  @Output() public toEdit: EventEmitter<Course> = new EventEmitter();

  public onDelete(): void {
    this.item.isDeleted = true;
    this.toDelete.emit(this.item);
  }

  public onEdit(): void {
    this.toEdit.emit(this.item);
  }
}
