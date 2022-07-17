import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);

    }
    return this.authService.keepLogin().pipe(
      tap( valid => {
         if ( !valid ) {

          this.router.navigate(['/login']);
            
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    this.authService.keepLogin();
    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);
      
      
     
    }
    return this.authService.keepLogin().pipe(
      tap( valid => {
         if ( !valid ) {
            this.router.navigate(['/login']);
        }
      })
    );
  }
  
}
