import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loader:  boolean = false;
  clicked: boolean = false;
  message: string = '';
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertMessage: AlertsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[ Validators.required, Validators.email ]],
      password:['',[ Validators.required]],  
    });
  }

  fieldNotValid( value:string): boolean {
		if ( this.loginForm.get( value )?.invalid && this.loginForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  saveLogin(): void {
    let errorResponse = [];
    this.message      = "";

    const keys = Object.keys(this.loginForm.controls);
    let controlIndex = 0;
    Object.values(this.loginForm.controls).forEach((control) => {
      console.log(keys[controlIndex], control.value, control.status);
      controlIndex++;
    });

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loader  = true;
    this.clicked = true;
    this.authService.login( this.loginForm.value ).subscribe(
      resp => { 
        this.loader = false;
        if( resp.ok ){
          setTimeout(() => {
            this.router.navigateByUrl('/goty');
          }, 500);
        }
        else {
          this.clicked = false;
          this.alertMessage.showMessage( resp.message );
        }
      },
    );

  }
}
