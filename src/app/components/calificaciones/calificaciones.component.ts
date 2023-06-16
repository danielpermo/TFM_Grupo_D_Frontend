import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {

  asignaturasArr: any[] = [];
  clasesArr: any[] = [];
  finalizada: string = "";
  myUser: any = {};
  profile: string = "";




  constructor( private router: Router,
    private asignaturasService: AsignaturasService, 
    private clasesService: ClasesService, 
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService,
    private administradoresService: AdministradoresService){}

  async ngOnInit() {
    this.getAsignaturas();
    this.getClases();
 

    const token = localStorage.getItem('token_user');
    const tokenDecode: any = jwtDecode(token!);
    const userType = tokenDecode.usuario_rol;
    if (userType === 'profe') {
      const response = await this.profesoresService.getProfesor();
      this.profile = "PROFESOR";
      this.myUser = response;
      return this.myUser;
    } else if (userType === 'alum') {
      const response = await this.alumnosService.getalumno(tokenDecode.usuario_id);
      this.profile = "ALUMNO";
      this.myUser = response;
      this.myUser = this.myUser[0];
      return this.myUser;
    }
    const response = await this.administradoresService.getById(tokenDecode.usuario_id);
    this.profile = "ADMINISTRADOR";
    this.myUser = response;
    return this.myUser;
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
      const usuarios: any = this.usuariosService.getAll(); console.log(usuarios);
      
      
      const profesores: any = await this.profesoresService.getAllPublic();     console.log(profesores);
  
    
      this.clasesArr = data.map((clase: any) => {
        const asignatura = this.asignaturasArr.find(
          (asignatura: any) => asignatura.id === clase.asignatura_id
        );

        return {
          ...clase,
          asignatura_nombre: asignatura ? asignatura.nombre : '',
          asignatura_rama: asignatura ? asignatura.rama : '',
          estado_asignatura: clase.finalizado ? "Finalizado" : "En curso",
          profesor: (asignatura.profesor_id===usuarios.id) ? usuarios.nombre : '',
          opinion: clase.opinion ? clase.opinion : ''
        };
      }).filter((clase: any) => clase.alumno_id === usuarioLogadoId);
    } catch (error) {
      console.error(error);
    }
  }


}