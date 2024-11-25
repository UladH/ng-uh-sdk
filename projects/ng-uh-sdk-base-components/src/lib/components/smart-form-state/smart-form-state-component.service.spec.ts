import { TestBed } from '@angular/core/testing';

import { SmartFormStateComponentService } from './smart-form-state-component.service';
import { Injectable } from '@angular/core';
import { ComponentState } from '../../constants/component-state.enum';

class FormModel{
}

@Injectable()
export class SmartFormStateTestComponentService extends SmartFormStateComponentService<FormModel> {
  protected override defaultValue: FormModel = {}

  //#region public

  public override initForm(): void {
    this.form = this.formBuilder.group({});
  }

  //#endregion
}

describe('SmartFormStateComponentService', () => {
  let service: SmartFormStateTestComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartFormStateTestComponentService]
    });
    service = TestBed.inject(SmartFormStateTestComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
