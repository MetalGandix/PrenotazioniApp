import { TestBed } from '@angular/core/testing';

import { PrenotazioneCampoService } from './prenotazione-campo.service';

describe('PrenotazioneCampoService', () => {
  let service: PrenotazioneCampoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotazioneCampoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
