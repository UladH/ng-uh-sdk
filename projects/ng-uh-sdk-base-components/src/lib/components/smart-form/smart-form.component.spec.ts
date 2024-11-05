import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormComponent } from './smart-form.component';
import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { SmartFormComponentService } from './smart-form-component.service';
import { ReactiveFormsModule } from '@angular/forms';

class FormModel{
}

@Injectable()
export class SmartFormComponentTestService extends SmartFormComponentService<FormModel> {
  protected override defaultValue: FormModel = {}

  //#region public

  public override initForm(): void {
    this.form = this.formBuilder.group({});
  }

  //#endregion
}

@Component({
  template:`
    <form #formElement="ngForm"
      [formGroup]="form"
      (ngSubmit)="onSubmitFormHandler()">
    </form>
  `
})
class SmartFormTestComponent extends SmartFormComponent<FormModel> {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartFormComponentTestService
  ){
    super(changeDetectorRef, componentService);
  }
}

describe('SmartFormComponent', () => {
  let component: SmartFormTestComponent;
  let fixture: ComponentFixture<SmartFormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [SmartFormTestComponent],
      providers: [SmartFormComponentTestService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
