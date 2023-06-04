import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string;
  usuarios: any = {};



  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/publica`, httpOptions)
    );
  }

  login(pUser: Usuario): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios/login`, pUser)
    );
  }

  registro(values: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/usuarios/registro`, values)
    )
  }

  isLogged(): boolean {
    return localStorage.getItem('token_user') ? true : false;
  }



  rol(pRol: string): boolean {
    const token = localStorage.getItem('token_user');
    const tokenDecode = jwtDecode<any>(token!);
    if (token) {
      return tokenDecode.usuario_rol === pRol;
    }
    return false;
  }

  getId(): number {
    const token = localStorage.getItem('token_user');
    const tokenDecode = jwtDecode<any>(token!);
    return tokenDecode.usuario_id;
  }


  // getById(pId: number): Promise<any> {
  //   return Promise.resolve(this.usuarios.find(usuarios => usuarios.id === pId));
  // }

  // create(pUsuario: Usuario): Promise<Usuario> {
  //   const newId = Number(this.usuarios.length + 1);
  //   const newUsuario = { ...pUsuario, id: newId };
  //   this.usuarios.push(newUsuario);
  //   return Promise.resolve(newUsuario);
  // }

  // update(pUsuario: Usuario): Promise<Usuario> {
  //   const index = this.usuarios.findIndex(usuarios => usuarios.id === pUsuario.id);
  //   if (index !== -1) {
  //     this.usuarios[index] = pUsuario;
  //     return Promise.resolve(pUsuario);
  //   } else {
  //     return Promise.reject(`User with ID ${pUsuario.id} not found.`);
  //   }
  // }

  // delete(pId: number): Promise<any> {
  //   const index = this.usuarios.findIndex(usuarios => usuarios.id === pId);
  //   if (index !== -1) {
  //     this.usuarios.splice(index, 1);
  //     return Promise.resolve();
  //   } else {
  //     return Promise.reject(`User with ID ${pId} not found.`);
  //   }
  // }
}

