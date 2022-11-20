import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RangeError } from './range-error.model';
import { Range } from './range.model';

export const rangeValidator = (range: Range): ValidatorFn => {
  return (control: AbstractControl): RangeError => {
    let result = null;
    if (
      control.value !== undefined &&
      (isNaN(control.value) ||
        control.value < range.min ||
        control.value > range.max)
    ) {
      result = { range: true };
    }
    return result;
  };
};
