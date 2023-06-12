import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TFM_Grupo_D';
  profile: string = "";

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
    const token = localStorage.getItem('token_user');
    if (token) {
      const tokenDecode: any = jwtDecode(token!);
      const userType = tokenDecode.usuario_rol;
      console.log(userType);
      if (userType === 'profe') {
        this.profile = "Profesor";
        console.log(this.profile);
        return this.profile;
      } else if (userType === 'alum') {
        this.profile = "Alumno";
        console.log(this.profile);
        return this.profile;
      }
      this.profile = "Aministrador";
      console.log(this.profile);
      return this.profile;
    }
    return this.profile = "";
  }

  isLogged() {
    return this.usuarioService.isLogged()
  }
}

