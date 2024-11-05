import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormStateComponent } from './smart-form-state.component';
import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { SmartFormStateComponentService } from './smart-form-state-component.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentState } from '../../constants/component-state.enum';

class FormModel{
}

@Injectable()
export class SmartFormStateComponentTestService extends SmartFormStateComponentService<FormModel> {
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
class SmartFormStateTestComponent extends SmartFormStateComponent<FormModel> {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartFormStateComponentTestService
  ){
    super(changeDetectorRef, componentService);
  }
}

describe('SmartFormStateComponent', () => {
  let component: SmartFormStateTestComponent;
  let fixture: ComponentFixture<SmartFormStateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [SmartFormStateTestComponent],
      providers: [SmartFormStateComponentTestService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFormStateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "emit" method of onStateChanged after changing component service state property', () => {
    const emit = spyOn(component.onStateChanged, 'emit');

    component.ngOnInit();
    fixture.detectChanges();
    (component['componentService'] as any).state = ComponentState.Empty;

    expect(emit).toHaveBeenCalledWith(ComponentState.Empty);
  });

  it('should call "markChanges" method after changing component service state property', () => {
    const markChanges = spyOn(component as any, 'markChanges');

    component.ngOnInit();
    fixture.detectChanges();
    (component['componentService'] as any).state = ComponentState.Empty;

    expect(markChanges).toHaveBeenCalled();
  });
});
