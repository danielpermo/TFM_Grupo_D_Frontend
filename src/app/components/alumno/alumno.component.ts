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
 
  alumno!: IAlumno;

  
  
  constructor(private servicioAlumno: AlumnosService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.alumno = {} as IAlumno;
  }
  

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(async (params: any) => {
        let id: number = params.id; 
        console.log(id);
        let res: any = await this.servicioAlumno.getById(id); 
        this.alumno = res[0]; 
        console.log(this.alumno);
      });
    }
    

    
}
