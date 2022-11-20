import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoursesComponent,
  EditCourseComponent,
  AddCourseComponent,
} from './containers';
import { CoursesRoutingModule } from './courses-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../shared/search/search.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CourseItemComponent, CourseEditFormComponent } from './components';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseItemComponent,
    CourseEditFormComponent,
    AddCourseComponent,
    EditCourseComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    SearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CoursesModule {}
