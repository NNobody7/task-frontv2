import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Note } from '../models/note';

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  public getAllNotes() {
    return (
      this.http
        .get<any>(environment.backendUri + 'api/notes')
        // need to pry it out of the Laravelian response
        .pipe(map((data) => data.data))
    );
  }

  public getNote(id: number) {
    return this.http.get<Note>(environment.backendUri + 'api/notes/' + id, {
      observe: 'response',
    });
  }
  public addNote(newNote: Note) {
    return this.http.post(environment.backendUri + 'api/notes', newNote, {
      observe: 'response',
    });
  }
  public updateNote(editedNote: Note) {
    return this.http.put(environment.backendUri + 'api/notes/'+editedNote.id, editedNote, {
      observe: 'response',
    });
  }
  public deleteNote(id: number) {
    return this.http.delete(environment.backendUri + 'api/notes/' + id, {
      observe: 'response',
    });
  }
  public filterNotes(filter: string){
    console.log(environment.backendUri+'api/notes?title[li]='+encodeURIComponent(filter));
    return this.http.get<any>(environment.backendUri+'api/notes?title[li]='+encodeURIComponent(filter))
      //.pipe(map((data)=>data.data));
  }
}
