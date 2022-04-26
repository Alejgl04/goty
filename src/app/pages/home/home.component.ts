import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: any[] = [];

  constructor(
    private gameService: GameService,
    private wsSevice:WebsocketService

  ) { }

  ngOnInit(): void {
    this.gameService.getGotyHome().subscribe( (resp) => {
      console.log( resp );
      this.games = resp;
      this.listenScoket();

    });
  }

  listenScoket() {
    this.wsSevice.listen('change-graphic').subscribe(
      (resp:any) => {
        console.log('socket', resp);
        this.games = resp
      }
    )
  }
}
