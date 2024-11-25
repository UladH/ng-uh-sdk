import { ChangeDetectorRef, Component, effect, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IStateComponent } from '../../interfaces/state-component.interface';
import { ComponentState } from '../../constants/component-state.enum';

@Component({
  template: ''
})
export abstract class StateComponent extends BaseComponent implements IStateComponent{
  @Output() public onStateChanged: EventEmitter<ComponentState> = new EventEmitter<ComponentState>();

  public readonly COMPONENT_STATE = ComponentState;

  protected _state: WritableSignal<ComponentState> = signal(ComponentState.Content);

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef
  ){
    super(changeDetectorRef);
  }

  //#endregion

  //#region getters setters

  public get state(): WritableSignal<ComponentState> {
    return this._state;
  }

  //#endregion

  //#region effects

  protected stateEffect = effect(() => {
    this.onStateChanged.emit(this.state());
  });
  
  //#endregion
}

