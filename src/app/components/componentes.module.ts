import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { GraphicBarHorizontalComponent } from './graphic-bar-horizontal/graphic-bar-horizontal.component';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { UserNameLoginPipe } from '../pipes/user-name-login.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    GraphicBarHorizontalComponent,
    UserNameLoginPipe
  ],
  exports: [
    NavbarComponent,
    GraphicBarHorizontalComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ]
})
export class ComponentesModule { }
