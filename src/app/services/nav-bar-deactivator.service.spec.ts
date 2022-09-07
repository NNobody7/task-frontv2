import { TestBed } from '@angular/core/testing';

import { NavBarDeactivatorService } from './nav-bar-deactivator.service';

describe('NavBarDeactivatorService', () => {
  let service: NavBarDeactivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavBarDeactivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
