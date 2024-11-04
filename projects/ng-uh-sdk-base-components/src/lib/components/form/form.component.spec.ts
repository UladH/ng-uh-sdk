import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../_index';

class FormModel{
}

@Component({
  selector: 'test',
  template:`
    <form #formElement="ngForm"
      [formGroup]="form"
      (ngSubmit)="onSubmitFormHandler()">
    </form>
  `
})
class FormTestComponent extends FormComponent<FormModel> {
  protected override defaultValue: FormModel = {}

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    formBuilder: FormBuilder,
  ){
    super(changeDetectorRef, formBuilder)
  }

  //#endregion

  //#region protected

  protected override initForm(): void {
    this.form = this.formBuilder.group({});
  }

  //#endregion
}

describe('FormComponent', () => {
  let component: FormTestComponent;
  let fixture: ComponentFixture<FormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [FormTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "initForm" method before super.ngOnInit', () => {
    const superNgOnInitSpy = spyOn(BaseComponent.prototype, 'ngOnInit').and.callThrough();
    const initFormSpy = spyOn(component as any, 'initForm');

    component.ngOnInit();
    fixture.detectChanges();

    expect(initFormSpy).toHaveBeenCalled();
    expect(initFormSpy).toHaveBeenCalledBefore(BaseComponent.prototype.ngOnInit);
  });

  it('should emit formElement.ngSubmit in "submitForm" method', () => {
    const emitSpy = spyOn(component.formElement.ngSubmit, 'emit');

    component.submitForm();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call "onSubmitFormHandler" after "submitForm" method', () => {
    const onSubmitFormHandlerSpy = spyOn(component, 'onSubmitFormHandler');

    component.submitForm();
    fixture.detectChanges();

    expect(onSubmitFormHandlerSpy).toHaveBeenCalled();
  });

  it('should emit onSubmit in "onSubmitFormHandler" method', () => {
    const emit = spyOn(component.onSubmit, 'emit');

    component.onSubmitFormHandler();
    fixture.detectChanges();

    expect(emit).toHaveBeenCalled();
  });it('should call "form.markAsPristine" in "onSubmitFormHandler" method', () => {
    const markAsPristineSpy = spyOn(component.form, 'markAsPristine');

    component.onSubmitFormHandler();
    fixture.detectChanges();

    expect(markAsPristineSpy).toHaveBeenCalled();
  });
});
