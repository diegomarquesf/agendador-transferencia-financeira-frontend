import { TestBed } from '@angular/core/testing';

import { TransferenciaServices } from './transferencia.services';

describe('TransferenciaServices', () => {
  let service: TransferenciaServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferenciaServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
