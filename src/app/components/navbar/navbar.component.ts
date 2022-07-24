import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn! : Observable<boolean>;

  get userLogin() {
    return this.authService.userAuth;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.isLoggedIn = authService.isLoggedInSubject();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
