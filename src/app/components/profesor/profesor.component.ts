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

  constructor(private profesoresService: ProfesoresService, private asignaturasService: AsignaturasService) { }


  ngOnInit() {
    this.getProfesor();
    this.getAsignaturas();
  }

  async getProfesor() {
    const response = await this.profesoresService.getProfesor();
    this.profesorObj = response;
    return this.profesorObj;
  }

  async getAsignaturas() {
    const response = await this.asignaturasService.getAll();
    this.asignaturas = response;
    return this.asignaturas;
  }

  async aceptarSeleccion() {
    console.log(this.asignaturaSeleccionada);
    const response = await this.profesoresService.addAsignatura(this.asignaturaSeleccionada);
    console.log(response);
    alert('Asignatura añadida.');
    window.location.reload();
    return response;
  }

}
