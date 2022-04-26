import { Component, OnInit } from '@angular/core';
import { Goty, MessageGoty } from 'src/app/interfaces/goty.interfaces';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.scss']
})
export class GotyComponent implements OnInit {
  games: Goty[] = [];
  loading: boolean = true;
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getGoty()
    .subscribe( (resp) => {
      console.log( resp );
      this.loading = false;
      this.games = resp.goty;
    })
  }

  voteGame( game: Goty ) {
    this.gameService.voteGame( game._id )
    .subscribe( (resp ) => {
      if( resp.ok ) {
        Swal.fire(
          'Game Of the Year',
          'Thanks for voting for the game of the year',
          'success'
        )
      }
      else {
        Swal.fire(
          'Oops',
          'Ocurrio un error, pruebe de nuevo',
          'error'
        )
      }
    });
  }

}
