import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  usuariosService = inject(UsuariosService);
  router = inject(Router);

  onClickLogout() {
    localStorage.removeItem('token_user');
    this.router.navigate(['/home']);
  }

}
