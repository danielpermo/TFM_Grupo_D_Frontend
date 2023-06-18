import { Component, OnInit, inject } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { ViewportScroller } from '@angular/common';

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
  ciudadesArr: string[] = [];
  asignaturasArr: any[] = [];
  asignaturasUnicas: any[] = [];
  filtradoArr: any[] = [];
  filtradoCiudad: boolean = false;
  filtradoAsignatura: boolean = false;
  filtrado: boolean = false;
  ciudad: string = "";
  asignatura: string = "";
  asignaturasActivate: boolean = false;
  ciudadActivate: boolean = false;

  profesoresService = inject(ProfesoresService);

  constructor(private viewportScroller: ViewportScroller) { }

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
    const ciudadesSet = new Set<string>();
    for (const profesor of this.profesArr) {
      ciudadesSet.add(profesor.ciudad);
    }
    this.ciudadesArr = Array.from(ciudadesSet).sort();
    this.ciudadesArr.unshift('Todas');

    const asignaturasSet = new Set<string>();
    for (const profesor of this.profesArr) {
      for (const asignatura of profesor.asignaturas) {
        asignaturasSet.add(asignatura);
      }
    }
    this.asignaturasArr = Array.from(asignaturasSet).sort();
    this.asignaturasArr = Object.values(
      this.asignaturasArr.reduce((acc, obj) => {
        acc[obj.asignatura_id] = { asignatura_id: obj.asignatura_id, nombre: obj.nombre };
        return acc;
      }, {})
    );
    const todas: any = { asignatura_id: 0, nombre: "Todas" };
    this.asignaturasArr.unshift(todas);
  }

  checkFiltradoCiudad(): boolean {
    if (this.filtradoCiudad === true) {
      return true;
    }
    return false;
  }

  checkFiltradoAsignatura() {
    if (this.filtradoAsignatura === true) {
      return true;
    }
    return false;
  }

  async filtrarCiudad(pCiudad: string) {
    if (pCiudad === 'Todas') {
      this.filtrado = false;
      return this.filtradoCiudad = false;
    }
    const response = await this.profesoresService.filtrarCiudad(pCiudad);
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

    this.filtradoArr = [];
    const profesArr: any[] = response;
    const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.ciudad === pCiudad);
    this.filtradoCiudad = true;
    this.filtrado = true;
    this.filtradoArr = profesFiltradoArr;
    return this.filtradoArr;
  }

  async filtrarAsignatura(pAsignatura: any) {
    if (pAsignatura === 0) {
      this.filtrado = false;
      return this.filtradoAsignatura = false;
    }
    const response = await this.profesoresService.filtrarAsignatura(pAsignatura);
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
    this.filtradoArr = [];
    const profesArr: any[] = response;
    const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.asignaturas.some((asignatura: any) => asignatura.asignatura_id === pAsignatura));
    this.filtradoAsignatura = true;
    this.filtrado = true;
    this.filtradoArr = profesFiltradoArr;
    return this.filtradoArr
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
