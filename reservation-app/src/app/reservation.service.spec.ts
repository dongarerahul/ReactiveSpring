import { TestBed, inject } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { describe } from 'jasmine';
import { beforeEach } from 'jasmine';
import { it } from 'jasmine';
import expect from 'jasmine';

describe('ReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationService]
    });
  });

  it('should be created', inject([ReservationService], (service: ReservationService) => {
    expect(service).toBeTruthy();
  }));
});
