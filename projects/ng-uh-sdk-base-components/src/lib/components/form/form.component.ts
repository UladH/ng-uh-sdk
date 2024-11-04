import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IFormComponent } from '../../interfaces/form-component.interface';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  template: ''
})
export abstract class FormComponent<T> extends BaseComponent implements IFormComponent<T> {
  @Output() public onSubmit: EventEmitter<T> = new EventEmitter<T>();
  @Output() public onCancel: EventEmitter<void> = new EventEmitter<void>();

  protected _form!: FormGroup;
  protected _formElement!: NgForm;
  protected abstract defaultValue: T;

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected formBuilder: FormBuilder,
  ) {
    super(changeDetectorRef);
  }

  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    this.initForm();
    super.ngOnInit();
  }

  //#endregion

  //#region getters setters

  @ViewChild('formElement') public set formElement(value: NgForm) {
    this._formElement = value;
  }

  public get formElement(): NgForm {
    return this._formElement;
  }

  protected set form(value: FormGroup) {
    this._form = value;
  }

  public get form(): FormGroup {
    return this._form;
  }

  //#endregion

  //#region public

  public submitForm(): void{
    this.formElement.ngSubmit.emit();
  }

  public onSubmitFormHandler(): void{
    if(!this.form.valid){
      return;
    }

    this.onSubmit.emit(this.form.value);
    this.form.markAsPristine();
  }

  public cancel(): void{
    this.onCancel.emit();
  }

  //#endregion

  //#region protected

  protected abstract initForm(): void;

  protected patchForm(value: T | Partial<T> | null): void{
    this.form.patchValue(value || {...this.defaultValue});
  }

  //#endregion
}
