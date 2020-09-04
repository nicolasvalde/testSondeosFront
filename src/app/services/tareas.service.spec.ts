import { TestBed } from '@angular/core/testing';

import { TareasService } from './tareas.service';

describe('TareasServiceService', () => {
  let service: TareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
