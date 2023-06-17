import { Component, OnInit } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  profesorObj: any = {}
  asignaturas: any[] = [];
  asignaturaSeleccionada!: number;
  claseCreada: boolean = false;

  constructor(private profesoresService: ProfesoresService, private asignaturasService: AsignaturasService) { }


  ngOnInit() {
    this.getProfesor();
    this.getAsignaturas();
  }

  async getProfesor() {
    const response = await this.profesoresService.getProfesor();
    this.profesorObj = response;
    console.log(this.profesorObj)
    return this.profesorObj;
  }

  async getAsignaturas() {
    const response = await this.asignaturasService.getAll();
    this.asignaturas = response;
    return this.asignaturas;
  }

  async aceptarSeleccion() {
    const [asignatura] = await this.asignaturasService.getById(this.asignaturaSeleccionada);
    const profesor = await this.profesoresService.getProfesor();
    const asignaturas = profesor.asignaturas;
    if (asignaturas.some((a: any) => a.nombre === asignatura.nombre)) {
      return alert('La asignatura ya estaba añadida.');
    }
    const response = await this.profesoresService.addAsignatura(this.asignaturaSeleccionada);
    alert('Asignatura añadida.');
    window.location.reload();
    return response;
  }

  async deleteAsignatura(pAsignatura: number) {
    const response = await this.profesoresService.deleteAsignatura(pAsignatura)
    console.log(response);
    alert('Asignatura eliminada.');
    window.location.reload();
    return response;
  }
  async crearClase(pAsignatura: number) {
    const response = await this.profesoresService.crearClase(pAsignatura);
    console.log(response);
    window.location.reload();
    return response;
  }
  async finalizarClase(pAsignatura: number) {
    const response = await this.profesoresService.finalizarClase(pAsignatura);
    console.log(response);
    window.location.reload();
    return response;
  }

  comprobarClase(pClase: number) {
    console.log(pClase)
    if (pClase === 0) {
      return true;
    }
    return false;
  }


}
