import { Injectable, signal, WritableSignal } from '@angular/core';
import { SmartFormComponentService } from '../smart-form/smart-form-component.service';
import { IStateComponentService } from '../../interfaces/state-component-service.interface';
import { ComponentState } from '../../constants/component-state.enum';
import { FormBuilder } from '@angular/forms';

@Injectable()
export abstract class SmartFormStateComponentService<T> extends SmartFormComponentService<T> implements IStateComponentService {
  public state: WritableSignal<ComponentState> = signal(ComponentState.Content);

  //#region constructor

  constructor(
    formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  //#endregion
}
