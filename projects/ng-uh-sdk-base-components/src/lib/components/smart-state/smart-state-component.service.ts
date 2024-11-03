import { Injectable } from '@angular/core';
import { SmartComponentService } from '../smart/smart.-component.service';
import { IStateComponentService } from '../../interfaces/state-component-service.interface';
import { ComponentState } from '../../constants/component-state.enum';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SmartStateComponentService extends SmartComponentService implements IStateComponentService {
  protected _state: ComponentState = ComponentState.Content;

  protected stateChangedSubject$: Subject<ComponentState> = new Subject<ComponentState>();

  //#region constructor

  constructor() {
    super();
  }

  //#endregion

  //#region getters setters

  protected set state(value: ComponentState){
    this._state = value;
    this.stateChangedSubject$.next(this.state);
  }

  public get state(): ComponentState {
    return this._state
  }

  //#endregion

  //#region events

  public get stateChanged$(): Observable<ComponentState>{
    return this.stateChangedSubject$.asObservable();
  }

  //#endregion
}
