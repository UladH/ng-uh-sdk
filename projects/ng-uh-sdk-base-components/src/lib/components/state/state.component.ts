import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IStateComponent } from '../../interfaces/state-component.interface';
import { ComponentState } from '../../constants/component-state.enum';

@Component({
  template: ''
})
export abstract class StateComponent extends BaseComponent implements IStateComponent{
  @Output() public onStateChanged: EventEmitter<ComponentState> = new EventEmitter<ComponentState>();

  public readonly COMPONENT_STATE = ComponentState;

  protected _state: ComponentState = ComponentState.Content;

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef
  ){
    super(changeDetectorRef);
  }

  //#endregion

  //#region getters setters

  public get state(): ComponentState {
    return this._state
  }

  protected set state(value: ComponentState){
    this._state = value;
    this.onStateChanged.emit(value);
    this.markChanges();
  }

  //#endregion
}

