import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IAlumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl: string = "http://localhost:3000/api/alumnos/";



  constructor(private httpClient: HttpClient) {}

  getAllPublic(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/alumnos`)
    );
  }

  getById(pId: number): Promise<IAlumno> {
    return lastValueFrom(this.httpClient.get<IAlumno>(`${this.baseUrl}${pId}`))
  }


}
