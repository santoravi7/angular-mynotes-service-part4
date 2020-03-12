import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Notedata } from './notedata';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : 'root',
})
export class NoteService {

  private notesUrl = "api/notes";
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http : HttpClient,
    private messageService: MessageService) { }

  // getNotes(): Observable<Notedata[]> {
  //   this.messageService.add('NoteService: fetched notes');
  //   console.log("this is service : "+Notes);
  //   return of(Notes);
  // }

  getNotes (): Observable<Notedata[]> {
    return this.http.get<Notedata[]>(this.notesUrl)
      .pipe(
        tap(_ => this.log('fetched notes')),
        catchError(this.handleError<Notedata[]>('getNotes', []))
      );
  }

  // getNote(id: number): Observable<Notedata> {
  //   // TODO: send the message _after_ fetching the hero
  //   console.log("This is noteService.getNote : "+id);
  //   this.messageService.add(`NoteService: fetched note id=${id}`);
  //   return of(Notes.find(note => note.id === id));
  // }

  getNote(id: number): Observable<Notedata> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Notedata>(url).pipe(
      tap(_ => this.log(`fetched Notedata id=${id}`)),
      catchError(this.handleError<Notedata>(`Notedata id=${id}`))
    );
  }

  addNote (note: Notedata): Observable<Notedata> {
    return this.http.post<Notedata>(this.notesUrl, note, this.httpOptions).pipe(
      tap((newMote: Notedata) => this.log(`added Note w/ id=${newMote.id}`)),
      catchError(this.handleError<Notedata>('addNote'))
    );
  }

  deleteNote (note: Notedata | number): Observable<Notedata> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Notedata>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted note id=${id}`)),
      catchError(this.handleError<Notedata>('deleteNote'))
    );
  }

  updateNote (note: Notedata): Observable<any> {
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      tap(_ => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  private log(message: string) {
    this.messageService.add(`NoteService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}