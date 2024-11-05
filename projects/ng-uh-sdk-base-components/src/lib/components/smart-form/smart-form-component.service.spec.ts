import { TestBed } from '@angular/core/testing';

import { SmartFormComponentService } from './smart-form-component.service';
import { Injectable } from '@angular/core';
import { SmartComponentService } from '../smart/smart-component.service';

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

describe('SmartFormComponentService', () => {
  let service: SmartFormComponentTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartFormComponentTestService]
    });
    service = TestBed.inject(SmartFormComponentTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call "initForm" method before super.ngOnInit', () => {
    const superNgOnInitSpy = spyOn(SmartComponentService.prototype, 'ngOnInit').and.callThrough();
    const initFormSpy = spyOn(service, 'initForm');

    service.ngOnInit();

    expect(initFormSpy).toHaveBeenCalled();
    expect(initFormSpy).toHaveBeenCalledBefore(SmartComponentService.prototype.ngOnInit);
  });

  it('should call next for onSubmitSubject$ in submit method', () => {
    const nextSpy = spyOn(service['onSubmitSubject$'], 'next');

    service.ngOnInit();
    service.submit();

    expect(nextSpy).toHaveBeenCalled();
  });

  it('should call form.markAsPristine method in submit method', () => {
    service.ngOnInit();
    const markAsPristineSpy = spyOn(service.form, 'markAsPristine');
    service.submit();
    expect(markAsPristineSpy).toHaveBeenCalled();
  });

  it('should call next for onSubmitSubject$ in submit method', () => {
    const nextSpy = spyOn(service['onSubmitSubject$'], 'next');

    service.ngOnInit();
    service.submit();

    expect(nextSpy).toHaveBeenCalled();
  });

  it('should call next for onCancelSubject$ in submit method', () => {
    const nextSpy = spyOn(service['onCancelSubject$'], 'next');

    service.ngOnInit();
    service.cancel();

    expect(nextSpy).toHaveBeenCalled();
  });
});
