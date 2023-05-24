import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string;
  usuarios: any = {};



  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios'
  }

  login(pUser: Usuario): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<Usuario>(`${this.baseUrl}/login`, pUser)
    );
  }

  registro(values: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/registro`, values)
    )
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

