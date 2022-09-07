import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Buffer } from 'buffer';
import { NoteService } from '../services/note.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
})
export class NoteDialogComponent implements OnInit {
  dialogTitle: string = '';
  inEdit: boolean = false;
  fileName: string = '';
  backendUri: string = environment.backendUri;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    coverPhoto: new FormControl('', []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService,
    private dialogRef: MatDialogRef<NoteDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.note) {
      this.dialogTitle = 'Note details';
      this.form.patchValue(this.data.note);
      this.fileName = this.data.note.coverPhoto;
      this.form.disable();
    } else {
      this.dialogTitle = 'Add new note';
      this.inEdit = true;
    }
  }

  toogleEdit() {
    this.inEdit = !this.inEdit;
    if (this.inEdit) {
      this.dialogTitle = 'Edit note';
      this.form.enable();
    } else {
      this.dialogTitle = 'Note details';
      this.form.disable();
    }
  }

  addNote() {
    if (this.form.valid) {
      this.noteService
        .addNote(this.form.getRawValue())
        .subscribe((response) => {
          if (response.status == 201) {
            this.dialogRef.close(response.body);
          }
        });
    }
  }
  updateNote() {
    if (this.form.valid) {
      let updatedNote = this.form.getRawValue();
      updatedNote.id = this.data.note.id;
      if(!/^data:image\/png/.test(this.form.get('coverPhoto')?.value)){
        delete updatedNote.coverPhoto;
      }
      this.noteService.updateNote(updatedNote).subscribe((response) => {
        if (response.status == 200) {
          this.dialogRef.close(response.body);
        }
      });
    }
  }
  deleteNote() {
    this.noteService.deleteNote(this.data.note.id).subscribe((response) => {
      if (response.status == 200) {
        this.dialogRef.close(response.body);
      }
    });
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    this.fileName = file.name;

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      if (reader.result){
        this.form.patchValue({
          coverPhoto: reader.result
        });;
      }
    };
  }
  
  base64OrNot(str: string){
    return /^data:image\/png/.test(str);
  }
  imageUri(str: string){
    return (str == null || str.length == 0) ? this.backendUri+'images/default.jpg' : this.backendUri+'storage/images/uploads/'+str;
  }
}
