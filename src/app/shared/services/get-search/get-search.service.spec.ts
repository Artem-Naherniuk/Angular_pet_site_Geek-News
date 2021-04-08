import { TestBed } from '@angular/core/testing';

import { GetSearchService } from './get-search.service';

describe('GetSearchService', () => {
  let service: GetSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
