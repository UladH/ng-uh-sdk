import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartStateComponent } from './smart-state.component';
import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { SmartStateComponentService } from './smart-state-component.service';
import { ComponentState } from '../../constants/component-state.enum';

@Injectable()
export class SmartStateComponentTestService extends SmartStateComponentService {}

@Component({
  template:''
})
class SmartStateTestComponent extends SmartStateComponent {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartStateComponentTestService
  ){
    super(changeDetectorRef, componentService);
  }
}

describe('SmartStateComponent', () => {
  let component: SmartStateTestComponent;
  let fixture: ComponentFixture<SmartStateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartStateTestComponent],
      providers: [SmartStateComponentTestService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartStateTestComponent);
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
