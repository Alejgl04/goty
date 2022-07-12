import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GotyComponent } from './pages/goty/goty.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'goty', component: GotyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
