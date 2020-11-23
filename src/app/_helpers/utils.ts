import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable()
export class Utils {
  min(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {

      let val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { 'min': true };
    }
  }

  minLengthArray = (min: number) => {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min)
        return null;

      return { MinLengthArray: true};
    }
  }
}
