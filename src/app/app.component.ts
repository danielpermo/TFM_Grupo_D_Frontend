import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFM_Grupo_D';
  profile: string = "";

  constructor(private usuarioService: UsuariosService) { }

  isLogged() {
    return this.usuarioService.isLogged()
  }
}

