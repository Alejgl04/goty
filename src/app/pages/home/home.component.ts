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
  loading: boolean = false;
  constructor(
    private gameService: GameService,
    private wsSevice:WebsocketService

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.gameService.getGotyHome().subscribe( (resp) => {
      this.loading = false;
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
