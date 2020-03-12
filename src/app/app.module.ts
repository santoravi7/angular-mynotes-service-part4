import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MynotesComponent } from './mynotes/mynotes.component';
import { NotesDescComponent } from './notes-desc/notes-desc.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NoteService } from './note.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service'; 


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ], 
 
  declarations: [ 
    AppComponent, 
    MynotesComponent, 
    NotesDescComponent, 
    NavBarComponent, 
    MessageComponent 
  ],
  bootstrap:    [ AppComponent ],
  providers: [InMemoryDataService, NoteService, MessageService],
  //providers: [NoteService, MessageService]
})  
export class AppModule { }
