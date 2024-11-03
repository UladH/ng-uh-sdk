import { Observable } from "rxjs";
import { ComponentState } from "../constants/component-state.enum";

export interface IStateComponentService {
  get state(): ComponentState;
  get stateChanged$(): Observable<ComponentState>
}
