import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IAlumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl: string = "https://teachersapp.onrender.com/api/alumnos";



  constructor(private httpClient: HttpClient) { }

  getAllPublic(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}`)
    );
  }

  getalumno(pId: number): Promise<IAlumno> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return lastValueFrom(this.httpClient.get<IAlumno>(`${this.baseUrl}/${pId}`, httpOptions))
  }

  getAlumProfes() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/profesores`, httpOptions))
  }

  update(pId: number, pAlumno: any): Promise<IAlumno> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return lastValueFrom(this.httpClient.put<IAlumno>(`${this.baseUrl}/${pId}`, pAlumno, httpOptions))
  }


}
