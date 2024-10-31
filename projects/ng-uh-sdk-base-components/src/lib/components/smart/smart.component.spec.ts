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

}

describe('SmartComponent', () => {
  let component: SmartTestComponent;
  let fixture: ComponentFixture<SmartTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartTestComponent],
      providers: [SmartComponentTestService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call component service ngOnInit method in component ngOnInit method', () => {
    const init = spyOn(component, 'ngOnInit').and.callThrough();
    const ngOnInit = spyOn(component['componentService'], 'ngOnInit');

    component.ngOnInit();
    fixture.detectChanges();

    expect(init).toHaveBeenCalled();
    expect(ngOnInit).toHaveBeenCalled();
  });
});
