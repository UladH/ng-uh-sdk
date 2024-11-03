import { EventEmitter } from "@angular/core";
import { ComponentState } from "../constants/component-state.enum";

export interface IStateComponent {
  readonly COMPONENT_STATE: typeof ComponentState;
  get state(): ComponentState;
  onStateChanged: EventEmitter<ComponentState>;
}
