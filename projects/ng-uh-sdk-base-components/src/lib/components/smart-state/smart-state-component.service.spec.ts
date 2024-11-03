import { TestBed } from '@angular/core/testing';

import { SmartStateComponentService } from './smart-state-component.service';
import { Injectable } from '@angular/core';
import { ComponentState } from '../../constants/component-state.enum';

@Injectable()
export class SmartStateComponentTestService extends SmartStateComponentService {}

describe('SmartStateService', () => {
  let service: SmartStateComponentTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartStateComponentTestService]
    });
    service = TestBed.inject(SmartStateComponentTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call "next" stateChangedSubject$ in state setter', () => {
    const emit = spyOn(service['stateChangedSubject$'], 'next');

    service['state'] = ComponentState.Content;

    expect(emit).toHaveBeenCalledWith(ComponentState.Content);
  });

  it('should call "emit" stateChangedSubject$ in state setter', () => {
    const emit = spyOn(service['stateChangedSubject$'], 'next');

    service['state'] = ComponentState.Content;

    expect(emit).toHaveBeenCalledWith(ComponentState.Content);
  });
});
