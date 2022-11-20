import { AbstractControl } from '@angular/forms';
import { DateError } from './date-error.model';

export const dateValidator = (control: AbstractControl): DateError => {
  let result = null;
  const dateRegEx =
    /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{2})$/;
  if (!dateRegEx.test(control.value)) {
    result = { date: true };
  }
  return result;
};
