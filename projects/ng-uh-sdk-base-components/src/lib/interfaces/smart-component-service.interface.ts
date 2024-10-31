import { Observable } from "rxjs";

export interface ISmartComponentService{
  get onMarkToCheck$(): Observable<void>;
  get onDetectChanges$(): Observable<void>
}
