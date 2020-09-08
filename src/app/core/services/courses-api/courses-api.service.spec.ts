import { TestBed } from "@angular/core/testing";

import { CoursesApiService } from "./courses-api.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Course, SearchParams } from "../../models";
import { Api } from "../../environments";

const mockCourses: Course[] = [
  {
    name: "Magna excepteur aute deserunt9",
    description:
      "Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
    createDate: "11/14/19",
    duration: 123,
    authors: "Authour2",
    id: 9
  },
  {
    name: "Magna excepteur aute deserunt8",
    description:
      "Est minim ea sunt laborum minim eu excepteer, Colpa sint exercitation mollit enim ad culpa allqulp laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
    createDate: "11/14/19",
    duration: 123,
    authors: "Authour2",
    id: 8
  }
];

describe("CoursesApiService", () => {
  let service: CoursesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesApiService]
    });
    service = TestBed.get(CoursesApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get courses with searchParams", () => {
    const serchParams: SearchParams = {
      name_like: 'Mag'
    };
    service.getCourses(serchParams).subscribe((courses: Course[]) => {
      expect(courses).toEqual(mockCourses);
    });
    const search = Object.entries(serchParams).map(([key, val]) => `${key}=${val}`).join('');
    const mockReq = httpMock.expectOne(`${Api.courses}?${search}`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourses);

    httpMock.verify();
  });

  it("should get courses", () => {
    service.getCourses().subscribe((courses: Course[]) => {
      expect(courses).toEqual(mockCourses);
    });

    const mockReq = httpMock.expectOne(Api.courses);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourses);

    httpMock.verify();
  });

  it("should get courses by id", () => {
    const id = 9;
    const mockCourse = mockCourses.find((course) => course.id === id);
    service.getCourseById(id).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const mockReq = httpMock.expectOne(`${Api.courses}/${id}`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourse);

    httpMock.verify();
  });

  it("should delete courses", () => {
    const id = 9;
    const mockCourse = mockCourses.find((course) => course.id === id);
    service.deleteCourse(mockCourse).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const mockReq = httpMock.expectOne(`${Api.courses}/${id}`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourse);

    httpMock.verify();
  });

  it("should update courses", () => {
    const id = 9;
    const mockCourse = mockCourses.find((course) => course.id === id);
    service.updateCourse(mockCourse).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const mockReq = httpMock.expectOne(`${Api.courses}/${id}`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourse);

    httpMock.verify();
  });

  it("should post courses", () => {
    const id = 9;
    const mockCourse = mockCourses.find((course) => course.id === id);
    service.postCourse(mockCourse).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const mockReq = httpMock.expectOne(Api.courses);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual("json");
    mockReq.flush(mockCourse);

    httpMock.verify();
  });
});
