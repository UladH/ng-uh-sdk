import { Injectable } from '@angular/core';
import { SmartComponentService } from '../smart/smart-component.service';
import { IFormComponentService } from '../../interfaces/form-component-service.interface';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export abstract class SmartFormComponentService<T> extends SmartComponentService implements IFormComponentService<T> {
  protected _form!: FormGroup;
  protected _formElement!: NgForm;

  protected abstract defaultValue: T;

  protected onSubmitSubject$: Subject<T> = new Subject<T>();
  protected onCancelSubject$: Subject<void> = new Subject<void>();

  //#region constructor

  constructor(
    protected formBuilder: FormBuilder
  ) {
    super();
  }

  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    this.initForm();
    super.ngOnInit();
  }

  //#endregion

  //#region getters setters

  public set formElement(value: NgForm) {
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

  //#region events

  public get onSubmit$(): Observable<T>{
    return this.onSubmitSubject$.asObservable();
  }

  public get onCancel$(): Observable<void>{
    return this.onCancelSubject$.asObservable();
  }

  //#endregion

  //#region public

  public submit(): void {
    this.form.markAsPristine();
    this.onSubmitSubject$.next(this.form.value);
  }

  public cancel(): void {
    this.onCancelSubject$.next();
  }

  public abstract initForm(): void;

  public patchForm(value: T | Partial<T> | null): void{
    this.form.patchValue(value || {...this.defaultValue});
  }

  //#endregion
}
