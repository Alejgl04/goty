import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { GraphicBarHorizontalComponent } from './graphic-bar-horizontal/graphic-bar-horizontal.component';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavbarComponent,
    GraphicBarHorizontalComponent,
  ],
  exports: [
    NavbarComponent,
    GraphicBarHorizontalComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ]
})
export class ComponentesModule { }
