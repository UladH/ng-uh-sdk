import { FormGroup, NgForm } from "@angular/forms";
import { Observable } from "rxjs";

export interface IFormComponentService<T> {
  get onSubmit$(): Observable<T>;
  get onCancel$(): Observable<void>;

  set formElement(value: NgForm);
  get formElement(): NgForm;
  get form(): FormGroup;

  submit(): void;
  cancel(): void;
  patchForm(value: T | Partial<T> | null): void;
  initForm(): void;
}
