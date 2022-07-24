import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  hide      : boolean  = true;
  loader    :  boolean = false;
  clicked   : boolean  = false;
  messageErr: string   = '';
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertMessage: AlertsService,
    private router: Router,
    private ngZone: NgZone
  ) { }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  ngOnInit(): void {
    this.ngZone.run(() => {

      this.loginForm = this.formBuilder.group({
        email:['',[ Validators.required, Validators.email ]],
        password:['',[ Validators.required]],  
      });
    });
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "736506785330-4gdh43dddg9bd1gjkohdfi1iu1puclr2.apps.googleusercontent.com",
      callback: ( response:any ) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    let errorResponse = [];
    this.messageErr      = "";
    this.authService.loginGoogle( response.credential ).subscribe(
      resp => {
        if (!resp.errors) {
          this.ngZone.run( () => {
            this.router.navigateByUrl('/goty');
          });
        } else {
          this.ngZone.run( () => {
            errorResponse = resp.errors;
            errorResponse.forEach((element:any) => {
              this.messageErr += `${ element.msg }. `;
              this.alertMessage.showMessage( this.messageErr );
            });
          });
        }
      }
    )
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
          this.router.navigateByUrl('/goty');
        }
        else {
          this.clicked = false;
          this.alertMessage.showMessage( resp.message );
        }
      },
    );
  }
}
