import { TestBed } from '@angular/core/testing';

import { JobStorageService } from './job-storage.service';

describe('JobStorageService', () => {
  let service: JobStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
