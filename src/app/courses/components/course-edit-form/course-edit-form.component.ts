import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Course } from 'src/app/core/models';
import { rangeValidator } from 'src/app/core/validators/range/range.validator';
import { dateValidator } from 'src/app/core/validators/date/date.validator';
import { Range } from 'src/app/core/validators/range/range.model';

@Component({
  selector: 'app-course-edit-form',
  templateUrl: './course-edit-form.component.html',
  styleUrls: ['./course-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditFormComponent {
  @Input() public set course(course: Course) {
    if (course) {
      this.profileForm.patchValue(course);
    }
  }
  @Input() public title: string;
  @Output() public saveCourse: EventEmitter<Course> = new EventEmitter();

  public profileForm: FormGroup;
  public maxLengthTitle = 50;
  public maxLengthDescription = 50;
  public range: Range = { min: 1, max: 600 };

  constructor(private fb: FormBuilder, private location: Location) {
    this.createForm();
  }

  public onCancel(): void {
    this.location.back();
  }

  public onSave(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.saveCourse.emit({
        ...this.profileForm.value,
        isDeleted: false,
        img: 'assets/course.svg',
      });
    }
  }

  private createForm(): void {
    this.profileForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(this.maxLengthTitle)],
      ],
      description: [
        '',
        [Validators.required, Validators.maxLength(this.maxLengthTitle)],
      ],
      createDate: ['', [Validators.required, dateValidator]],
      duration: [
          '',
          [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          rangeValidator(this.range),
        ],
        ],
        authors: ['', Validators.required],
    });
  }
}
