import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseComponent {
  public title = 'Update course! ';
  public id: number = Number(this.activedRouter.snapshot.params.id);
  public course$: Observable<Course> = this.coursesService.getCourseById(
    this.id
  );

  constructor(
    private activedRouter: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  public updateCourse(course: Course): void {
    this.coursesService.updateCourse({ ...course, id: this.id });
  }
}
