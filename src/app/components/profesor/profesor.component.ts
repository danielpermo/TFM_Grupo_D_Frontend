import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  profesorObj: any = {}

  constructor(private profesoresService: ProfesoresService) { }


  ngOnInit() {
    this.getProfesor();
  }

  async getProfesor() {
    const response = await this.profesoresService.getProfesor();
    this.profesorObj = response;
    return this.profesorObj;
  }

}
