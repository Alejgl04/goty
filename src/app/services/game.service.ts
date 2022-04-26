import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Goty,MessageGoty } from '../interfaces/goty.interfaces';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
    ) { }
    
    getGoty() {
      return this.http.get<{goty:Goty[]}>(`${ environment.url }/goty`);
    }

    getGotyHome() {
      return this.http.get<{goty:Goty[]}>(`${ environment.url }/goty`).pipe(
        map( ( resp ) =>{
          return resp.goty.map( ({ name, votos }) => ({ name, value:votos }))
        })
      );
    }

    voteGame( id:string ) {
      return this.http.post<MessageGoty>(`${ environment.url }/goty/${id}`, {}).pipe(
        catchError( err => {
          return of( err.error)
        })
      )
    }

    voteGameSocket( id:string ) {
      return this.http.post<{goty:Goty[]}>(`${ environment.url }/goty/${id}`, {}).pipe(
        map( ( resp ) =>{
          console.log('respservice', resp)
          return resp.goty.map( ({ name, votos }) => ({ name, value:votos }))
        })
      )
    }
  }
