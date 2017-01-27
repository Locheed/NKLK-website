/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScoreboardService } from './scoreboard.service';

describe('ScoreboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreboardService]
    });
  });

  it('should ...', inject([ScoreboardService], (service: ScoreboardService) => {
    expect(service).toBeTruthy();
  }));
});
