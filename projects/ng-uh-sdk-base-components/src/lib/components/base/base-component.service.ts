import { Injectable } from '@angular/core';
import { IBaseComponentService } from '../../interfaces/base/base-service.interface';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Injectable()
export abstract class BaseComponentService implements IBaseComponentService {
  protected subscriptions = new Subscription();
  protected unsubscribeSubject$: Subject<void> = new Subject<void>();

  //#region constructor

  constructor() { }

  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //#endregion

  //#region protected

  protected addUnsubscribePipe<T>(observable$: Observable<T>): Observable<T>{
    return observable$.pipe(
      takeUntil(this.unsubscribeSubject$)
    )
  }

  protected addSubscriptions(): void {
  }

  protected removeSubscriptions(): void{
    this.unsubscribeSubject$.next();
    this.unsubscribeSubject$.complete();
    this.subscriptions.unsubscribe();
  }

  //#endregion
}
