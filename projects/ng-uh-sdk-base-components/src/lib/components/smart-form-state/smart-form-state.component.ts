import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
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

  public get state(): ComponentState {
    return this.componentService.state;
  }

  //#endregion

  //#region protected

  protected onStateChangedHandler(value: ComponentState): void{
    this.onStateChanged.emit(value);
    this.markChanges();
  }

  protected override addSubscriptions(): void{
    super.addSubscriptions();

    this.subscriptions.add(
      this.componentService.stateChanged$.subscribe(this.onStateChangedHandler.bind(this))
    );
  }

  //#endregion

}
