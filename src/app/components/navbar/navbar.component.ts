import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn! : Observable<boolean>;
  log!: Observable<string>;

  constructor(
    private authService: AuthService
  ) { 
    this.isLoggedIn = authService.isLoggedInSubject();
  }

  ngOnInit(): void {

  }

}
