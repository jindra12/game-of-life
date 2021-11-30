import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { RedComponent } from './red/red.component';
import { GreenComponent } from './green/green.component';
import { PurpleComponent } from './purple/purple.component';
import { BlueComponent } from './blue/blue.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RedComponent,
    GreenComponent,
    PurpleComponent,
    BlueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
