import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { IStateComponent } from '../../interfaces/state-component.interface';
import { ComponentState } from '../../constants/component-state.enum';
import { SmartStateComponentService } from './smart-state-component.service';

@Component({
  template: ''
})
export class SmartStateComponent extends SmartComponent implements IStateComponent{
  public readonly COMPONENT_STATE = ComponentState;

  @Output() public onStateChanged: EventEmitter<ComponentState> = new EventEmitter<ComponentState>();

  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected override componentService: SmartStateComponentService
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
