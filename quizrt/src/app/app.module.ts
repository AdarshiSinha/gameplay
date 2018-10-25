import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import{ MatDialogModule} from '@angular/material';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayersComponent } from './players/players.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayComponent } from './play/play.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { TwoPlayersComponent } from './two-players/two-players.component';
import { ThreePlayersComponent } from './three-players/three-players.component';
import { FourPlayersComponent } from './four-players/four-players.component';
import {MatCardModule} from '@angular/material/card';
import { ChatComponent } from './chat/chat.component';
// import { PlayerService } from './player.service';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PlayersComponent,
    LoginComponent,
    PlayComponent,
    SinglePlayerComponent,
    TwoPlayersComponent,
    ThreePlayersComponent,
    FourPlayersComponent,
    ChatComponent,
    // PlayerService
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents :[PlayersComponent,
   LoginComponent
  ]
})


export class AppModule { }
