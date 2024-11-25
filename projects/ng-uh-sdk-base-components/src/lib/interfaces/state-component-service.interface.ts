import { ComponentState } from "../constants/component-state.enum";
import { WritableSignal } from "@angular/core";

export interface IStateComponentService {
  get state(): WritableSignal<ComponentState>;
}
