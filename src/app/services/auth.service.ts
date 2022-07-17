import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, mapTo, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/user.interfaces';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.url;
  private userLog!: User;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser!: string | any;
  public isUserLoggedIn: Subject<boolean> = new Subject<boolean>();


  get userAuth() {
    return { ...this.userLog };
  }

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

  login(user: { username: string, password: string }): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, user)
      .pipe(
        tap( resp => {
          console.log(resp);
          if( resp.ok ) {
            this.doLoginUser(resp.user, resp.token);
          }
        }),
        catchError( error => of( error.error ) )
      );
  }

  logout() {
    this.doLogoutUser();
    return true;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    const headers = new HttpHeaders().set('x-token', this.getRefreshToken() || '' );

    return this.http.post<Auth>(`${this.baseUrl}/auth/refresh`, { headers } ).pipe(
      tap(( resp ) => {
      this.doLoginUser(resp.user, resp.token);
      this.storeJwtToken(resp.token);
    }));
  }

  keepLogin(): Observable<boolean> {
    const url  = `${this.baseUrl}/auth/refresh`;
    const headers = new HttpHeaders().set('x-token', this.getJwtToken() );

    return this.http.get<Auth>( url, { headers } ).pipe(
      map( resp => {
        this.doLoginUser(resp.user, resp.token);
        return resp.ok;
      }),
    )
  }


  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

  private doLoginUser(user: User, tokens: any) {
    this.loggedUser = user.email;
    this.userLog = new User(user.name, user.email, user.role, user.uid, user.status);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.isUserLoggedIn.next(false);

  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any ) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
