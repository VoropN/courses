import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from 'src/app/core/models';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent {
  public title = 'New Course';

  constructor(private coursesService: CoursesService) {}

  public postCourse(course: Course): void {
    this.coursesService.postCourse(course);
  }
}
