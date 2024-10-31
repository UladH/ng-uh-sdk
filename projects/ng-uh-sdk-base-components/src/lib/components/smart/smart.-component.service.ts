import { Injectable } from '@angular/core';
import { BaseComponentService } from '../base/base-component.service';
import { ISmartComponentService } from '../../interfaces/smart-component-service.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export abstract class SmartComponentService extends BaseComponentService implements ISmartComponentService{
  protected onMarkToCheckSubject$: Subject<void> = new Subject<void>();
  protected onDetectChangesSubject$: Subject<void> = new Subject<void>();

  //#region constructor

  constructor() {
    super();
  }

  //#endregion

  //#region events

  public get onMarkToCheck$(): Observable<void>{
    return this.onMarkToCheckSubject$.asObservable();
  }

  public get onDetectChanges$(): Observable<void>{
    return this.onDetectChangesSubject$.asObservable();
  }

  //#endregion

  //#region protected

  protected markToCheck(): void{
    this.onMarkToCheckSubject$.next();
  }

  protected detectChanges(): void{
    this.onDetectChangesSubject$.next();
  }

  //#endregion
}
