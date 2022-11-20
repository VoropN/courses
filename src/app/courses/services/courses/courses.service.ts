import { Injectable } from '@angular/core';
import { CoursesApiService } from 'src/app/core/services/courses-api/courses-api.service';
import { Observable, Subject, BehaviorSubject, EMPTY, of } from 'rxjs';
import { Course } from '../../../core/models';
import { SearchParams } from 'src/app/core/models';
import { tap, retry, catchError, finalize, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { MessageService } from 'src/app/core/services/message/message.service';

enum deletedStateOperation {
  add,
  delete,
}
@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesSubject: Subject<Course[]> = new Subject();
  public courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  private coursesNameSubject: Subject<Course[]> = new Subject();
  public coursesName$: Observable<Course[]> =
    this.coursesNameSubject.asObservable();

  private courseDeletedStateSubject: BehaviorSubject<number[]> =
    new BehaviorSubject([]);

  private initSearchParams: SearchParams = { _start: 0, _end: 3 };
  public searchParamsSubject: BehaviorSubject<SearchParams> =
    new BehaviorSubject({ ...this.initSearchParams });

  constructor(
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private coursesApiService: CoursesApiService,
    private router: Router
  ) { }

  public getCourses(params: SearchParams = { ...this.initSearchParams }): void {
    const searchParams = this.updateSearchParamsState(params);
    this.coursesApiService
      .getCourses(searchParams)
      .pipe(
        tap((courses) => {
          if (courses.length < 1) {
            const message = 'Courses not found!';
            this.messageService.showNotification(message, 'error', 'Ok');
          } else {
            const courseDeleted = this.courseDeletedStateSubject.getValue();
            courses = courses.map((course) => ({
              ...course,
              isDeleted: courseDeleted.includes(course.id),
            }));
          }
          this.coursesSubject.next(courses);
        }),
        retry(2),
        catchError(
          (error) => (
            this.errorHandler.handleResponceError(
              error,
              'Can\'t load courses! Try again later.'
            ),
            EMPTY
          )
        )
      )
      .subscribe();
  }

  public getCoursesName(params?: SearchParams): void {
    this.coursesApiService
      .getCourses(params)
      .pipe(
        tap((courses) => this.coursesNameSubject.next(courses)),
        retry(2),
        catchError(
          (error) => (
            this.errorHandler.handleResponceError(
              error,
              'Can\'t load courses! Try again later.'
            ),
            EMPTY
          )
        )
      )
      .subscribe();
  }

  public getCourseById(id: number): Observable<Course> {
    return this.coursesApiService.getCourseById(id).pipe(
      retry(2),
      catchError((error) => {
        this.redirectToCoursesPage();
        this.errorHandler.handleResponceError(
          error,
          `Can\'t load course by id ${id}!`
        );
        return EMPTY;
      })
    );
  }

  public deleteCourse(course: Course): void {
    this.updateDeletedState(course, deletedStateOperation.add);
    this.coursesApiService
      .deleteCourse(course)
      .pipe(
        tap(() => {
          const message = `Course '${course.name}' deleted successfully!`;
          this.messageService.showNotification(message, 'success', 'Ok');
        }),
        retry(2),
        catchError(
          (error) => (
            this.errorHandler.handleResponceError(
              error,
              `Can\'t delete course '${course.name}'!`
            ),
            EMPTY
          )
        ),
        finalize(() => {
          this.courses$
            .pipe(take(1))
            .subscribe(() =>
              this.updateDeletedState(course, deletedStateOperation.delete)
            );
          const end =
            this.searchParamsSubject.value._end === this.initSearchParams._end
              ? this.initSearchParams._end
              : this.searchParamsSubject.value._end - 1;
          const searchParams = { _end: end };
          this.getCourses(searchParams);
        })
      )
      .subscribe();
  }

  public postCourse(course: Course): void {
    this.coursesApiService
      .postCourse(course)
      .pipe(
        tap((courseCreated) => {
          const message = `Course '${courseCreated.name}' created successfully!`;
          this.messageService.showNotification(message, 'success', 'Ok');
        }),
        retry(2),
        catchError(
          (error) => (
            this.errorHandler.handleResponceError(
              error,
              `Can\'t create course '${course.name}'!`
            ),
            EMPTY
          )
        ),
        finalize(() => this.redirectToCoursesPage())
      )
      .subscribe();
  }

  public updateCourse(course: Course): void {
    this.coursesApiService
      .updateCourse(course)
      .pipe(
        tap((courseUpdated) => {
          const message = `Course '${courseUpdated.name}' updated successfully!`;
          this.messageService.showNotification(message, 'success', 'Ok');
        }),
        retry(2),
        catchError(
          (error) => (
            this.errorHandler.handleResponceError(
              error,
              `Can\'t updated course '${course.name}'!`
            ),
            EMPTY
          )
        ),
        finalize(() => this.redirectToCoursesPage())
      )
      .subscribe();
  }

  public redirectToCoursesPage(): void {
    this.router.navigate(['../']);
  }

  private updateSearchParamsState(params): SearchParams {
    const searchParams = { ...this.searchParamsSubject.value, ...params };
    this.searchParamsSubject.next(searchParams);
    return searchParams;
  }

  private updateDeletedState(
    course: Course,
    operation: deletedStateOperation
  ): void {
    let currentStack = this.courseDeletedStateSubject.value;
    switch (operation) {
      case deletedStateOperation.add: {
        currentStack.push(course.id);
        break;
      }
      case deletedStateOperation.delete: {
        currentStack = currentStack.filter((id) => id !== course.id);
        break;
      }
    }
    this.courseDeletedStateSubject.next(currentStack);
  }
}
