import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
// @ts-ignore
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  pId!: number;

  usuariosService = inject(UsuariosService);
  router = inject(Router);
  token: any = localStorage.getItem('token_user');


  onClickLogout() {
    Swal.fire({
      title: `¿Seguro que desea salir de la sesión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#082147',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Su sesión ha finalizado!',
          `Te esperamos`,
          'success'
        )
        localStorage.removeItem('token_user');
        alert('Logout realizado correctamente.')
        this.router.navigate(['/home']);
      }
    })
  }


  getId() {
    return this.pId = this.usuariosService.getId();
  }
}
