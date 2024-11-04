import { EventEmitter } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

export interface IFormComponent<T>{
  onSubmit: EventEmitter<T>;
  onCancel: EventEmitter<void>;

  set formElement(value: NgForm);
  get formElement(): NgForm;
  get form(): FormGroup;

  cancel(): void;
  submitForm(): void;
  onSubmitFormHandler(): void;
}
