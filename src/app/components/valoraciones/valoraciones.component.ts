import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  asignaturasArr: any[] = [];
  clasesArr: any[] = [];
  finalizada: string = "";
  myUser: any = {};
  profile: string = "";
  clase: any = {}; 

  constructor(
    private asignaturasService: AsignaturasService,
    private clasesService: ClasesService,
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService
  ) {}

  async ngOnInit() {
    this.getAsignaturas();
    this.getClases();

    const token = localStorage.getItem('token_user');
    const tokenDecode: any = jwtDecode(token!);
    const userType = tokenDecode.usuario_rol;
    if (userType === 'profe') {
      const response = await this.profesoresService.getProfesor();
      this.profile = 'PROFESOR';
      this.myUser = response;
      return this.myUser;
    } else if (userType === 'alum') {
      const response = await this.alumnosService.getalumno(tokenDecode.usuario_id);
      this.profile = 'ALUMNO';
      this.myUser = response;
      this.myUser = this.myUser[0];
      return this.myUser;
    }
  }

  async getAsignaturas() {
    try {
      const response: any[] = await this.asignaturasService.getAll();
      this.asignaturasArr = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getClases() {
    try {
      const data: any[] = await this.clasesService.getAll();
      const usuarioLogadoId: number = this.usuariosService.getId();
      const usuarios: any = this.usuariosService.getAll();
      console.log(usuarios);
  
      const profesores: any = await this.profesoresService.getAllPublic();
      console.log(profesores);
  
      if (this.myUser.rol === 'alum') {
        this.clasesArr = data
          .map((clase: any) => {
            const asignatura = this.asignaturasArr.find(
              (asignatura: any) => asignatura.id === clase.asignatura_id
            );
  
            return {
              ...clase,
              asignatura_nombre: asignatura ? asignatura.nombre : '',
              asignatura_rama: asignatura ? asignatura.rama : '',
              estado_asignatura: clase.finalizado ? 'Finalizado' : 'En curso',
              opinion: clase.opinion ? clase.opinion : ''
             // profesor: asignatura.profesor_id === usuarios.id ? usuarios.nombre : ''
            };
          })
          .filter((clase: any) => clase.alumno_id === usuarioLogadoId);
      } else if (this.myUser.rol === 'profe') {
        this.clasesArr = data
          .map((clase: any) => {
            const asignatura = this.asignaturasArr.find(
              (asignatura: any) => asignatura.id === clase.asignatura_id
            );
  
            return {
              ...clase,
              asignatura_nombre: asignatura ? asignatura.nombre : '',
              asignatura_rama: asignatura ? asignatura.rama : '',
              estado_asignatura: clase.finalizado ? 'Finalizado' : 'En curso',
               opinion: clase.opinion ? clase.opinion : ''
              //profesor: clase.profesor_id === usuarioLogadoId ? usuarios.nombre : ''
            };
          })
          .filter((clase: any) => clase.profesor_id === usuarioLogadoId);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
}
