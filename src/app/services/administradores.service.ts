import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/administradores'
  }

  getAllProfes(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/listado/profe`, httpOptions)
    );
  }

  getAllAlum(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/listado/alum`, httpOptions)
    );
  }

  delete(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${pId}`, httpOptions)
    );
  }

  getById(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}`, httpOptions)
    );
  }

  validateProfe(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.patch<any>(`${this.baseUrl}/${pId}`, { "validado": 1 }, httpOptions)
    );
  }

}
