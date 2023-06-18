import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachersapp.onrender.com/api'
  }

  getAll(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/clases`, httpOptions));
  }

  getClasesActivas(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/alumnos/clasesActivas`, httpOptions));
  }

  getById(pId: any): Promise<any> {
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/${pId}`));
  }
  
  create(values: any): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/alumnos/NuevaClase`,values, httpOptions)
    );
  }

  delete(info_delete: any): Promise<any> {
    console.log(info_delete);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    };
    console.log(`${this.baseUrl}/clases/delete/${info_delete.profesorId}/${info_delete.asignaturaId}/${info_delete.alumnoId}`,info_delete, httpOptions);
    return firstValueFrom(this.httpClient.put(`${this.baseUrl}/clases/delete/${info_delete.profesorId}/${info_delete.asignaturaId}/${info_delete.alumnoId}`,info_delete, httpOptions));
  }

  valorar(idclase: number,comentario: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    };
    return firstValueFrom(this.httpClient.post(`${this.baseUrl}/clases/${idclase}${comentario}`, httpOptions));
  }
}