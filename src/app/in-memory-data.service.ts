import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Notedata } from './notedata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
       {
        id:1,
        name: 'Note 1',    
        description: 'this is my first note description. I can add notes and to-do list here and save it for my future reference!!!',
        color: '#602379'
      },
      {
        id:2,
        name: 'Note 2',    
        description: 'A great phone with one of the best cameras',
        color: '#29b38d'
      },
      {
        id:3,
        name: 'Note 3',    
        description: '',
        color: '#f3785c'
      }
    ];
    return {notes};
  }

  // Overrides the genId method to ensure that a note always has an id.
  // If the notes array is empty,
  // the method below returns the initial number (11).
  // if the notes array is not empty, the method below returns the highest
  // note id + 1.
  genId(note: Notedata[]): number {
    return note.length > 0 ? Math.max(...note.map(note => note.id)) + 1 : 11;
  }
}