import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/user.interfaces';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  register( user:User ): Observable<Auth> {
    const url  = `${this.baseUrl}/users/`;
    return this.http.post<Auth>(url, user).pipe(
      map( resp => resp.ok ),
      catchError( error => of( error.error ) )

    );
  }
}
