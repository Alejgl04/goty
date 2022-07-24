import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/user.interfaces';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.url;
  private userLog!: User;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser!: string | any;
  isLoginSubject = new BehaviorSubject<boolean>( this.isLoggedIn() );

  get userLoginEmail() {
    return this.loggedUser;
  }
  get userAuth() {
    return { ...this.userLog };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
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
          if( resp.ok ) {
            this.doLoginUser(resp.user, resp.token);
            this.isLoginSubject.next(true);
          }
        }),
        catchError( error => of( error.error ) )
      );
  }

  loginGoogle( token: string ): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/google`, {id_token: token} )
    .pipe(
      tap( resp => {
        if( resp.ok ) {
          this.doLoginUser(resp.user, resp.token);
          this.isLoginSubject.next(true);
          this.router.navigateByUrl('/goty');
        }
      }),
      catchError( error => of( error.error ) )
    );
  }

  logout() {
    this.doLogoutUser();
    this.ngZone.run(() => {
      google.accounts.id.revoke(this.userLog.email, () => {
          this.router.navigateByUrl('/login');
        });
      });
    return true;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  isLoggedInSubject() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
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
    this.isLoginSubject.next(false);
    this.removeTokens();

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
