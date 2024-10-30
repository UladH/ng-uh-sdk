import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { Component } from '@angular/core';

@Component({
  template:''
})
class BaseTestComponent extends BaseComponent {
}

describe('BaseComponent', () => {
  let component: BaseTestComponent;
  let fixture: ComponentFixture<BaseTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark for check', () => {
    const markForCheck = spyOn(component['changeDetectorRef'], 'markForCheck');

    component['markChanges']();
    fixture.detectChanges();

    expect(markForCheck).toHaveBeenCalled();
  });

  it('should detect changes', () => {
    const detectChanges = spyOn(component['changeDetectorRef'], 'detectChanges');

    component['detectChanges']();
    fixture.detectChanges();

    expect(detectChanges).toHaveBeenCalled();
  });

  it('should unsubscribe all observables on destroy', () => {
    const destroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    const unsubscribe = spyOn(component['subscriptions'], 'unsubscribe');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(destroy).toHaveBeenCalled();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
