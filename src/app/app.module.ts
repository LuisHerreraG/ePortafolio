import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScaffoldComponent } from './public/pages/main-scaffold/main-scaffold.component';
import { MainPageComponent } from './landing-hook/pages/main-page/main-page.component';
import {provideHttpClient} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    MainScaffoldComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    StyleClassModule,
    ToolbarModule,
    CardModule,
    ImageModule,
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
