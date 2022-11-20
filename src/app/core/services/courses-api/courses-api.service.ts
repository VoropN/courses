import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models';
import { SearchParams } from '../../models';
import { httpOptions } from '../../environments/http-options';
import { Api } from '../../environments/api';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {
  constructor(private http: HttpClient) {}

  public getCourses(searchParams?: SearchParams): Observable<Course[]> {
    return this.http.get<Course[]>(
      Api.courses,
      this.createSearchParams(searchParams)
    );
  }

  private createSearchParams(searchParams: SearchParams): Params {
    let result;
    if (searchParams) {
      let params = new HttpParams();
      Object.keys(searchParams).forEach(
        (key: string) => (params = params.set(key, searchParams[key]))
      );
      result = { params };
    }

    return result;
  }

  public getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${Api.courses}/${id}`);
  }

  public deleteCourse(course: Course): Observable<any> {
    return this.http.delete<{}>(`${Api.courses}/${course.id}`);
  }

  public postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(Api.courses, course, httpOptions);
  }

  public updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${Api.courses}/${course.id}`,
      course,
      httpOptions
    );
  }
}
