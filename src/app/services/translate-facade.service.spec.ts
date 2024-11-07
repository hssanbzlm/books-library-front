import { TestBed } from '@angular/core/testing';

import { TranslateFacadeService } from './translate-facade.service';

describe('TranslateFacadeService', () => {
  let service: TranslateFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
