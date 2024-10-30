import { TestBed } from '@angular/core/testing';

import { BaseComponentService } from './base-component.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseComponentTestService extends BaseComponentService {}

describe('BaseComponentService', () => {
  let service: BaseComponentTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseComponentTestService]
    });
    service = TestBed.inject(BaseComponentTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add subscriptions on init', () => {
    const addSubscriptions = spyOn(service as any, 'addSubscriptions');

    service.ngOnInit();

    expect(addSubscriptions).toHaveBeenCalled();
  });

  it('should add pipe in addUnsubscribePipe', () => {
    const observable$ = of()
    const addPipe = spyOn(observable$, 'pipe');

    service['addUnsubscribePipe'](observable$);

    expect(addPipe).toHaveBeenCalled();
  });

  it('should call next and complete for unsubscribeSubject$ on destroy', () => {
    const destroy = spyOn(service, 'ngOnDestroy').and.callThrough();
    const next = spyOn(service['unsubscribeSubject$'], 'next');
    const complete = spyOn(service['unsubscribeSubject$'], 'complete');

    service.ngOnDestroy();

    expect(destroy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(complete).toHaveBeenCalled();
  });

  it('should unsubscribe all observables on destroy', () => {
    const destroy = spyOn(service, 'ngOnDestroy').and.callThrough();
    const unsubscribe = spyOn(service['subscriptions'], 'unsubscribe');

    service.ngOnDestroy();

    expect(destroy).toHaveBeenCalled();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
