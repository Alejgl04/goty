import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide:    boolean = true;
  loader:  boolean = false;
  clicked: boolean = false;
  message: string = '';
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertMessage: AlertsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      name:['',[ Validators.required ]],
      email:['',[ Validators.required, Validators.email ]],
      password:['',[ Validators.required]],
      status:[true],
      role:['USER_ROLE'],
  
    });
  }

  
  fieldNotValid( value:string): boolean {
		if ( this.registerForm.get( value )?.invalid && this.registerForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  saveRegister(): void {
    let errorResponse = [];
    this.message      = "";

    const keys = Object.keys(this.registerForm.controls);
    let controlIndex = 0;
    Object.values(this.registerForm.controls).forEach((control) => {
      console.log(keys[controlIndex], control.value, control.status);
      controlIndex++;
    });

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loader  = true;
    this.clicked = true;
    this.authService.register( this.registerForm.value ).subscribe(
      resp => { 
        this.loader = false;
        this.clicked = false;
        if( resp.errors ){
          errorResponse = resp.errors;
          errorResponse.forEach((element:any) => {
            this.message += `${ element.msg }. `;
            this.alertMessage.showMessage( this.message );
          });
        }
        else {
          this.alertMessage.showMessage( 'Se ha completado el registro de usuario exitosamente' );
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1000);

        }
      },
    );

  }
}
