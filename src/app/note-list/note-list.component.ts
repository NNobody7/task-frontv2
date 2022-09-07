import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  backendUri = environment.backendUri;
  constructor(private noteService: NoteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  openDialog(selectedNote: any) {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: { note: selectedNote },
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (selectedNote) {
        let editedNote = this.notes.find((note) => {
          note.id == selectedNote.id;
        });
        editedNote = result;
      } else {
        this.notes.push(result);
      }
      this.ngOnInit();
    });
  }
  filterChange(event: any){
    this.noteService.filterNotes(event.target.value).subscribe(data => this.notes = data.data);
  }
}
