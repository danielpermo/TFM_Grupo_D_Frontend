import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: string = "";

  constructor() { }

  ngOnInit() {
    const token = localStorage.getItem('token_user');
    if (token) {
      const tokenDecode: any = jwtDecode(token!);
      const userType = tokenDecode.usuario_rol;
      if (userType === 'profe') {
        this.profile = "Profesor";
        return this.profile;
      } else if (userType === 'alum') {
        this.profile = "Alumno";
        return this.profile;
      }
      this.profile = "Aministrador";
      return this.profile;
    }
    return this.profile = "";
  }

}
