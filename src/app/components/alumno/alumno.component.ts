import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IAlumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumno: any = {}



  constructor(private alumnosservice: AlumnosService, private activatedRoute: ActivatedRoute, private router: Router) {

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = params.userId;
      let res: any = await this.alumnosservice.getalumno(id);
      this.alumno = res[0];
    });
  }



}
