import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from "jwt-decode";
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
// @ts-ignore
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: any = {};
  profile: string = "";
  pId!: number;

  usuariosService = inject(UsuariosService);

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService,
    private administradoresService: AdministradoresService
  ) { }

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
    Swal.fire({
      title: `¿Desea borrar el usuario ${this.myUser.nombre}?`,
      text: "Si lo haces, ¡no podrás volver atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#082147',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (this.profile === 'PROFESOR') {
        if (result.isConfirmed) {
          const response = await this.profesoresService.deleteProfesor();
          console.log(response);

          Swal.fire(
            '¡Eliminado!',
            `El usuario ${this.myUser.nombre} ha sido borrado correctamente`,
            'success'
          )
          localStorage.removeItem('token_user');
          this.router.navigate(['/home']);
          return response;
        }
      }
      if (result.isConfirmed) {
        const response = await this.administradoresService.delete(pId);
        console.log(response);

        Swal.fire(
          '¡Eliminado!',
          `El usuario ${this.myUser.nombre} ha sido borrado correctamente`,
          'success'
        )
        localStorage.removeItem('token_user');
        this.router.navigate(['/home']);
        return response;
      }
    });
  }

  getId() {
    return this.pId = this.usuariosService.getId();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
