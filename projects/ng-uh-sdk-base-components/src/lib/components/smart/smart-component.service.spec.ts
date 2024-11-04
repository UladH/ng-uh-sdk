import { TestBed } from '@angular/core/testing';
import { SmartComponentService } from './smart-component.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SmartComponentTestService extends SmartComponentService {}

describe('SmartComponentService', () => {
  let service: SmartComponentTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartComponentTestService]
    });
    service = TestBed.inject(SmartComponentTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call next for onMarkToCheckSubject$ in markToCheck method', () => {
    const next = spyOn(service['onMarkToCheckSubject$'], 'next');

    service['markToCheck']();

    expect(next).toHaveBeenCalled();
  });

  it('should call next for onDetectChangesSubject$ in detectChanges method', () => {
    const next = spyOn(service['onDetectChangesSubject$'], 'next');

    service['detectChanges']();

    expect(next).toHaveBeenCalled();
  });
});
