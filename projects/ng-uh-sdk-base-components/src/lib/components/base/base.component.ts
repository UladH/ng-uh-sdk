import { ChangeDetectorRef, Component } from '@angular/core';
import { IBaseComponent } from '../../interfaces/base-component.interface';
import { Subscription } from 'rxjs';

@Component({
  template:''
})
export abstract class BaseComponent implements IBaseComponent{
  protected subscriptions: Subscription = new Subscription();

  //#region constructor

  constructor(
    protected changeDetectorRef: ChangeDetectorRef
  ){
  }

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

  protected addSubscriptions(): void {
  };

  protected removeSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  protected markChanges(): void{
    this.changeDetectorRef.markForCheck();
  }

  protected detectChanges(): void{
    this.changeDetectorRef.detectChanges();
  }

  //#endregion
}
