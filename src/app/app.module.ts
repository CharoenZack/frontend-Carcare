import { FormatSelectItemPipe } from './shared/pipe/format-select-item-pipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { AccordionModule } from 'primeng/accordion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';


@NgModule({
  declarations: [
    AppComponent,
    FormatSelectItemPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ContentModule,
    AccordionModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainModule

  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
