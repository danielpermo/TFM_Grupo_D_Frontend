import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from "jwt-decode";
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: any = {};
  profile: string = "";

  constructor(private router: Router, private profesoresService: ProfesoresService, private alumnosService: AlumnosService, private administradoresService: AdministradoresService) {

  }

  async ngOnInit() {
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

  async borrarUsuario(pId: number) {
    const response = await this.administradoresService.delete(pId);
    console.log(response);
    localStorage.removeItem('token_user');
    alert('Logout realizado correctamente.')
    this.router.navigate(['/home']);
    return response;
  }

}
