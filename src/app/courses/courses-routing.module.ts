import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { AddCourseComponent } from './containers/add-course/add-course.component';
import { EditCourseComponent } from './containers/edit-course/edit-course.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent
  },
  {
    path: 'add', component: AddCourseComponent
  },
  {
    path: 'edit/:id', component: EditCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
