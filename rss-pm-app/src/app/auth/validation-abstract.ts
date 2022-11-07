import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IPassValidationErrors } from './models/validation-errors.model';
import { lowerCaseSymbols, nums, specialSymbols, upperCaseSymbols } from '../shared/shared.consts';

export abstract class ValidationAbstract {
  passwordValidator(pw: AbstractControl): IPassValidationErrors | null {
    const validationErrors = {} as IPassValidationErrors;

    if (pw.value.length) {
      if (pw.value.length < 8) validationErrors.invalidLength = true;
      if (!upperCaseSymbols.test(pw.value) || !lowerCaseSymbols.test(pw.value))
        validationErrors.invalidUpperLower = true;
      if (!specialSymbols.test(pw.value)) validationErrors.invalidSpecialSymbol = true;
      if (!nums.test(pw.value)) validationErrors.invalidNums = true;
    }

    if (Object.keys(validationErrors).length) return validationErrors;
    return null;
  }

  matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);
      if (sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value) {
        targetCtrl?.setErrors({ invalidMatch: true });
      }
      return null;
    };
  }

  checkErrorsLength(errors: ValidationErrors | undefined | null): number {
    if (errors) return Object.keys(errors).length;
    return 0;
  }
}
