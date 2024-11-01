import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartComponent } from './smart.component';
import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { SmartComponentService } from './smart.-component.service';

@Injectable()
export class SmartComponentTestService extends SmartComponentService {}

@Component({
  template:''
})
class SmartTestComponent extends SmartComponent {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartComponentTestService
  ){
    super(changeDetectorRef, componentService);
  }

  public override addSubscriptions(): void {

  }
}

describe('SmartComponent', () => {
  let component: SmartTestComponent;
  let fixture: ComponentFixture<SmartTestComponent>;
  let componentServiceSpy: jasmine.SpyObj<SmartComponentTestService>;

  beforeEach(async () => {
    componentServiceSpy = jasmine.createSpyObj(SmartComponentTestService, ['ngOnInit']);

    await TestBed.configureTestingModule({
      declarations: [SmartTestComponent],
      providers: [{ provide: SmartComponentTestService, useValue: componentServiceSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartTestComponent);
    component = fixture.componentInstance;
    spyOn(component, 'addSubscriptions').and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call component service ngOnInit method in component ngOnInit method', () => {
    const init = spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(init).toHaveBeenCalled();
    expect(componentServiceSpy.ngOnInit).toHaveBeenCalled();
  });

  it('should call componentService.ngOnInit before super.ngOnInit', () => {
    const superNgOnInitSpy = spyOn(SmartComponent.prototype, 'ngOnInit');

    component.ngOnInit();

    expect(componentServiceSpy.ngOnInit).toHaveBeenCalledBefore(superNgOnInitSpy);
  });
});
