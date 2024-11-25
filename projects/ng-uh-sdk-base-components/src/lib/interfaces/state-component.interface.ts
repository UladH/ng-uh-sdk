import { EventEmitter, WritableSignal } from "@angular/core";
import { ComponentState } from "../constants/component-state.enum";

export interface IStateComponent {
  readonly COMPONENT_STATE: typeof ComponentState;
  get state(): WritableSignal<ComponentState>;
  onStateChanged: EventEmitter<ComponentState>;
}
