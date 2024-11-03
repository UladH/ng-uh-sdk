import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateComponent } from './state.component';
import { ComponentState } from '../../constants/component-state.enum';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  template:''
})
class StateTestComponent extends StateComponent {
  constructor(
    changeDetectorRef: ChangeDetectorRef
  ){
    super(changeDetectorRef);
  }
}

describe('StateComponent', () => {
  let component: StateTestComponent;
  let fixture: ComponentFixture<StateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StateTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onStateChanged in state setter', () => {
    const emit = spyOn(component.onStateChanged, 'emit');

    component['state'] = ComponentState.Content;
    fixture.detectChanges();

    expect(emit).toHaveBeenCalledWith(ComponentState.Content);
  });

  it('should call markChanges in state setter', () => {
    const markChanges = spyOn(component as any, 'markChanges');

    component['state'] = ComponentState.Content;
    fixture.detectChanges();

    expect(markChanges).toHaveBeenCalled();
  });
});
