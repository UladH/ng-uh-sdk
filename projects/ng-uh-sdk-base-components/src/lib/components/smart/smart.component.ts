import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ISmartComponent } from '../../interfaces/smart-component.interface';
import { SmartComponentService } from './smart.-component.service';

@Component({
  template: ''
})
export abstract class SmartComponent extends BaseComponent implements ISmartComponent {
  //#region constructor

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    protected componentService: SmartComponentService
  ){
    super(changeDetectorRef);
  }

  //#endregion

  //#region lifecycle hooks

  public override ngOnInit(): void {
    this.componentService.ngOnInit();
    super.ngOnInit();
  }

  //#endregion

  //#region protected

  protected override addSubscriptions(): void {
    super.addSubscriptions();

    this.subscriptions.add(
      this.componentService.onMarkToCheck$.subscribe(this.markChanges.bind(this))
    );

    this.subscriptions.add(
      this.componentService.onDetectChanges$.subscribe(this.detectChanges.bind(this))
    );
  }

  //#endregion
}
