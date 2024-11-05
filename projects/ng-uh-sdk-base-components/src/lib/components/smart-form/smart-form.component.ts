import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { IFormComponent } from '../../interfaces/form-component.interface';
import { SmartFormComponentService } from './smart-form-component.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  template: ''
})
export abstract class SmartFormComponent<T> extends SmartComponent implements IFormComponent<T> {
  @Output() public onSubmit: EventEmitter<T> = new EventEmitter<T>();
  @Output() public onCancel: EventEmitter<void> = new EventEmitter<void>();

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartFormComponentService<T>
  ){
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters

  @ViewChild('form') public set formElement(value: NgForm) {
    this.componentService.formElement = value;
  }

  public get formElement(): NgForm {
    return this.componentService.formElement;
  }

  public get form(): FormGroup {
    return this.componentService.form;
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

    this.componentService.submit();
  }

  public cancel(): void{
    this.componentService.cancel();
  }

  //#endregion

  //#region protected

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.subscriptions.add(
      this.componentService.onSubmit$.subscribe(this.onSubmitServiceHandler.bind(this))
    );

    this.subscriptions.add(
      this.componentService.onCancel$.subscribe(this.onCancelHandler.bind(this))
    );
  }

  protected onSubmitServiceHandler(value: T): void{
    this.onSubmit.emit(value);
  }

  protected onCancelHandler(): void{
    this.onCancel.emit();
  }

  //#endregion
}
