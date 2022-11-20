import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course, SearchParams } from '../../../core/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchOptions } from 'src/app/shared/search/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  public courses$: Observable<Course[]> = this.coursesService.courses$;
  public coursesName$: Observable<Course[]> = this.coursesService.coursesName$;
  public searchParams: BehaviorSubject<SearchParams> =
    this.coursesService.searchParamsSubject;
  public searchOpitions: SearchOptions = {
    placeholder: 'Search Course',
  };
  public isDisabled = false;

  constructor(private coursesService: CoursesService, private router: Router) {
    this.coursesService.getCourses();
  }

  public onSearch(search): void {
    this.coursesService.getCourses({
      ...this.searchParams.value,
      name_like: search,
    });
  }

  public onSearchName(search): void {
    this.coursesService.getCoursesName({ name_like: search });
  }

  public trackByCourses(id: number, course: Course): number {
    return course.id;
  }

  public tryToShowButtonMore(courses: Course[]): boolean {
    return courses.length >= this.searchParams.value._end;
  }

  public showMoreCourses(): void {
    if (this.searchParams && this.searchParams.value) {
      this.coursesService.getCourses({
        _end: this.searchParams.value._end + 1,
      });
    }
  }

  public onDelete(course: Course): void {
    this.isDisabled = true;
    this.coursesService.deleteCourse(course);
  }

  public onEdit(course: Course): void {
    this.router.navigate([this.router.url, 'edit', course.id]);
  }
}
