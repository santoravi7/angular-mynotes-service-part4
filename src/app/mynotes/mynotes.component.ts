import { Component, OnInit } from '@angular/core';
import { Note } from '../notedata';
import { NoteService } from '../note.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {

  notes : Note[];
  colors = [ 
      {value : '#CD5C5C'},
      {value : '#7DCEA0'},
      {value : '#FFA406'},
      {value : '#5D9EBC'},
      {value : '#7B5DB0'},
      {value : '#E82640'},
      {value : '#18CFA0'}
    ];
  colorRandomVal;
  colorVal;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes(): void {
    this.noteService.getNotes()
        .subscribe(notes => this.notes = notes);
  }
  noteLen;
  add(name: string, color: string, description: string): void {
    
    this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
    this.noteLen = this.notes.length+1;
    name = "Note "+this.noteLen;
    console.log("asdfa = "+name);
    color = this.colors[this.colorRandomVal].value;
    description = description;
    console.log("desc - "+description)
    if (!name) { return; }
    this.noteService.addNote({ name,description,color } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }
}