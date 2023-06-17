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

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachersapp.onrender.com/api/usuarios'
  }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl, httpOptions)
    );
  }

  login(pUser: Usuario): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<Usuario>(`${this.baseUrl}/login`, pUser)
    );
  }

  registro(values: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/registro`, values)
    );
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
}

