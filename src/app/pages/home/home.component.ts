import { Component, OnInit } from '@angular/core';
import { Goty } from 'src/app/interfaces/goty.interfaces';
import { GameService } from 'src/app/services/game.service';
import * as Rx from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Goty[] = [];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getGotyHome().subscribe( (resp) => {
      console.log( resp );
      // this.games = resp;
    })
  }
}
