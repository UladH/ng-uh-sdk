import { Injectable } from '@angular/core';
import { SmartFormComponentService } from '../smart-form/smart-form-component.service';
import { IStateComponentService } from '../../interfaces/state-component-service.interface';
import { ComponentState } from '../../constants/component-state.enum';
import { Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable()
export abstract class SmartFormStateComponentService<T> extends SmartFormComponentService<T> implements IStateComponentService {
  protected _state: ComponentState = ComponentState.Content;

  protected stateChangedSubject$: Subject<ComponentState> = new Subject<ComponentState>();

  //#region constructor

  constructor(
    formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  //#endregion

  //#region getters setters

  public get state(): ComponentState {
    return this._state
  }

  protected set state(value: ComponentState ){
    this._state = value;
    this.stateChangedSubject$.next(this.state);
  }

  //#endregion

  //#region events

  public get stateChanged$(): Observable<ComponentState>{
    return this.stateChangedSubject$.asObservable();
  }

  //#endregion
}
