import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ClasesService } from 'src/app/services/clases.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  comment: string = '';
  form: FormGroup;
  rating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { profesor_id: number, alumno_id: number, asignatura_id: number },
    private clasesService: ClasesService,
    private snack: MatSnackBar
  ) {
    this.form = new FormGroup({
      comment: new FormControl(),
      rating: new FormControl()
    });
  }

  enviarFormulario(): void {

    var jotason = {
      profesor_id: this.data.profesor_id,
      alumno_id: this.data.alumno_id,
      asignatura_id: this.data.asignatura_id,
      valoracion: this.form.value.rating,
      opinion: this.form.value.comment
    };
   this.clasesService.valorar(jotason).then(response => {
    console.log(response);
    this.snack.open(response, 'Aceptar', {
      duration: 3000,
      panelClass: ['green-snackbar']
    });
   })
   this.dialogRef.close();
    
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
