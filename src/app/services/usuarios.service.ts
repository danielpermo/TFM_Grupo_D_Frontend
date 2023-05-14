import { Injectable } from '@angular/core';
import { usuarios } from '../db/usuarios.db';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Usuario[];



  constructor() { 
    this.usuarios = usuarios
  }

  getAll(): Promise<any> {
    return Promise.resolve(usuarios);
  }
  

  getById(pId: number): Promise<any> {
    return Promise.resolve(this.usuarios.find(usuarios => usuarios.id === pId));
  }

  create(pUsuario: Usuario): Promise<Usuario> {
    const newId = Number(this.usuarios.length + 1);
    const newUsuario = { ...pUsuario, id: newId };
    this.usuarios.push(newUsuario);
    return Promise.resolve(newUsuario);
  }

  update(pUsuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex(usuarios => usuarios.id === pUsuario.id);
    if (index !== -1) {
      this.usuarios[index] = pUsuario;
      return Promise.resolve(pUsuario);
    } else {
      return Promise.reject(`User with ID ${pUsuario.id} not found.`);
    }
  }

  delete(pId: number): Promise<any> {
    const index = this.usuarios.findIndex(usuarios => usuarios.id === pId);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return Promise.resolve();
    } else {
      return Promise.reject(`User with ID ${pId} not found.`);
    }
  }
}

