import { ChangeDetectorRef, Component, effect, EventEmitter, Output, WritableSignal } from '@angular/core';
import { SmartFormComponent } from '../smart-form/smart-form.component';
import { IStateComponent } from '../../interfaces/state-component.interface';
import { ComponentState } from '../../constants/component-state.enum';
import { SmartFormStateComponentService } from './smart-form-state-component.service';

@Component({
  template: ''
})
export abstract class SmartFormStateComponent<T> extends SmartFormComponent<T> implements IStateComponent{
  @Output() public onStateChanged: EventEmitter<ComponentState> = new EventEmitter<ComponentState>();

  public readonly COMPONENT_STATE = ComponentState;

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartFormStateComponentService<T>
  ){
    super(changeDetectorRef, componentService);
  }

  //#endregion

  //#region getters setters

  public get state(): WritableSignal<ComponentState> {
    return this.componentService.state;
  }

  //#endregion
  
  //#region effects

  protected stateEffect = effect(() => {
    this.onStateChanged.emit(this.state());
  });
  
  //#endregion
}
