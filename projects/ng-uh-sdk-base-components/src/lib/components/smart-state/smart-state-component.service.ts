import { Injectable, signal, WritableSignal } from '@angular/core';
import { SmartComponentService } from '../smart/smart-component.service';
import { IStateComponentService } from '../../interfaces/state-component-service.interface';
import { ComponentState } from '../../constants/component-state.enum';

@Injectable()
export class SmartStateComponentService extends SmartComponentService implements IStateComponentService {
  public state: WritableSignal<ComponentState> = signal(ComponentState.Content);

  //#region constructor

  constructor() {
    super();
  }

  //#endregion
}
