/**
 * Created by eason on 16-9-19.
 */
import {NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { GameComponent } from './game/index';
import { EditorComponent } from './editor/index';
import { CommandComponent } from './command/index';
import { MenuBarComponent } from './menu-bar/index';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, GameComponent, EditorComponent,
      CommandComponent,MenuBarComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(){
    }
}
