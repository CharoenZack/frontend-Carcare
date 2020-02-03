import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../auth/auth.module';
import { ContentModule } from '../content/content.module';
import { MainRouingModule } from './main-routing.module';

import { TopbarComponent } from './topbar/topbar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MainComponent } from './main.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [MainComponent , TopbarComponent , MenubarComponent],
  imports: [
    CommonModule,
    MainRouingModule,
    ContentModule,
    MenubarModule,
    MenuModule,
    HttpClientModule
  ],
  exports : [MainComponent]
})
export class MainModule { }
