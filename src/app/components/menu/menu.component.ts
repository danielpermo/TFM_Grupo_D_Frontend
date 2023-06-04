import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  pId!: number;

  usuariosService = inject(UsuariosService);
  router = inject(Router);


  onClickLogout() {
    localStorage.removeItem('token_user');
    alert('Logout realizado correctamente.')
    this.router.navigate(['/home']);
  }


  getId() {
    return this.pId = this.usuariosService.getId();
  }
}
