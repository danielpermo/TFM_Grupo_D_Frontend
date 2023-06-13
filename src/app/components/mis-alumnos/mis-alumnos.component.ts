import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-mis-alumnos',
  templateUrl: './mis-alumnos.component.html',
  styleUrls: ['./mis-alumnos.component.css']
})
export class MisAlumnosComponent implements OnInit {

  alumArr: any = [];


  constructor(private profesoresService: ProfesoresService) {

  }

  async ngOnInit() {
    const response = await this.profesoresService.getProfeAlum();
    this.alumArr = response;
    return this.alumArr;
  }

  async finalizarClaseAlumno(pAsignatura: number, pAlumno: number) {
    const response = await this.profesoresService.finalizarClaseAlumno(pAsignatura, pAlumno);
    console.log(response);
    return response;
  }

}
