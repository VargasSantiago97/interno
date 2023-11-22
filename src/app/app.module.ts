import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { HttpClientModule } from '@angular/common/http';
import { SorteoComponent } from './components/sorteo/sorteo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BingoComponent } from './components/bingo/bingo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SorteoComponent,
    BingoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
