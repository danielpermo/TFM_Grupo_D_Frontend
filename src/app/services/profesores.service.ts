import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/profesor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private baseUrl: string;



  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachersapp.onrender.com/api/profesores'
  }

  getAllPublic(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`https://teachersapp.onrender.com/api/publica`)
    );
  }

  getProfesor(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/perfil`, httpOptions));
  }

  updateProfesor(pProfesor: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.put(`${this.baseUrl}`, pProfesor, httpOptions));
  }

  deleteProfesor(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      }),
      body: { borrado: 1 }
    }
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/perfil`, httpOptions)
    );
  }

  getProfeAlum() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/alumnos`, httpOptions));
  }

  getProfeAlumById(pId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/alumnos/${pId}`, httpOptions));
  }

  addAsignatura(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.post(`${this.baseUrl}/asignaturas/${pAsignatura}`, null, httpOptions));
  }

  deleteAsignatura(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/asignaturas/${pAsignatura}`, httpOptions));
  }

  crearClase(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.patch(`${this.baseUrl}/clases/${pAsignatura}`, { "clase": 1 }, httpOptions));
  }

  finalizarClase(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      }),
      body: { clase: 0 }
    };
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/clases/${pAsignatura}`, httpOptions));
  }

  finalizarClaseAlumno(pAsignatura: number, pAlumno: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      }),
      body: { asignatura_id: pAsignatura }
    };
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/alumnos/${pAlumno}`, httpOptions));
  }

  filtrarCiudad(pCiudad: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`https://teachersapp.onrender.com/api/publica/ciudad/${pCiudad}`)
    );
  }

  filtrarAsignatura(pAsignatura: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`https://teachersapp.onrender.com/api/publica/asignatura/${pAsignatura}`)
    );
  }

}
