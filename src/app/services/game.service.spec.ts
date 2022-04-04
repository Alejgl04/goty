import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        HttpClient
      ],
    });
    service = TestBed.inject(GameService);
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
