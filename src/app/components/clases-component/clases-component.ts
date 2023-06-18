import { Component, inject } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-clases-component',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {

  myUser: any = {};
  profile: string = "";
  pId!: number;
  usuariosService = inject(UsuariosService);

  constructor(
    private viewportScroller: ViewportScroller,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService
  ) { }

  async ngOnInit() {
    this.getId();

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

  getId() {
    return this.pId = this.usuariosService.getId();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
