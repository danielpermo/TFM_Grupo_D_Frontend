import { Component, OnInit, inject } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profesArr: Profesor[] = [];
  profesArrPar: Profesor[] = [];
  profesArrImp: Profesor[] = [];
  combinedArr: any = [];

  profesoresService = inject(ProfesoresService);

  async ngOnInit() {
    const response = await this.profesoresService.getAllPublic();
    response.sort((a: { puntuacion: string; }, b: { puntuacion: string; }) => {
      // Comprobar si a y b tienen la puntuación "No valorado"
      if (a.puntuacion === "No valorado" && b.puntuacion === "No valorado") {
        return 0;
      }
      if (a.puntuacion === "No valorado") {
        return 1; // Mover 'a' al final
      }
      if (b.puntuacion === "No valorado") {
        return -1; // Mover 'b' al final
      }

      // Ordenar por puntuación de mayor a menor
      return Number(b.puntuacion) - Number(a.puntuacion);
    });
    this.profesArr = response;
    this.profesArrPar = this.profesArr.filter((_, index) => index % 2 === 0);
    this.profesArrImp = this.profesArr.filter((_, index) => index % 2 === 1);
    const maxLength = Math.max(this.profesArrPar.length, this.profesArrImp.length);
    for (let i = 0; i < maxLength; i++) {
      this.combinedArr.push({ par: this.profesArrPar[i], impar: this.profesArrImp[i] });
    }
  }


}

