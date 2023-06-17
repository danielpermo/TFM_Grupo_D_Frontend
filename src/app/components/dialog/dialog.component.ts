import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  comment: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private clasesService: ClasesService
  ) {}

  enviarFormulario(data: number): void {
    
    this.clasesService.valorar(data,this.comment)
    .then(response => {
      console.log('Valoration successful:', response);
    })
    .catch(error => {
      console.error('Valoration failed:', error);
    });

    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
