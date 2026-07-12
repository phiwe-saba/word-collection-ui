import { TestBed } from '@angular/core/testing';

import { WordCollectionService } from './word-collection.service';

describe('WordCollectionService', () => {
  let service: WordCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
