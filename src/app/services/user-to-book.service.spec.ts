import { TestBed } from '@angular/core/testing';

import { UserToBookService } from './user-to-book.service';

describe('UserToBookService', () => {
  let service: UserToBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
