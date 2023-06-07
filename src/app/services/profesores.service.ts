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
    this.baseUrl = 'http://localhost:3000/api/'
  }

  getAllPublic(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/publica`)
    );
  }

  getProfesor(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/profesores/perfil`, httpOptions));
  }

  addAsignatura(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.post(`${this.baseUrl}/profesores/asignaturas/${pAsignatura}`, null, httpOptions));
  }

  deleteAsignatura(pAsignatura: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    }
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/profesores/asignaturas/${pAsignatura}`, httpOptions));
  }


  // getById(pId: number): Promise<any> {
  //   return Promise.resolve(this.profesores.find(profesores => profesores.id === pId));
  // }

  // create(pProfesor: Profesor): Promise<Profesor> {
  //   const newId = Number(this.profesores.length + 1);
  //   const newProfesor = { ...pProfesor, id: newId };
  //   this.profesores.push(newProfesor);
  //   return Promise.resolve(newProfesor);
  // }

  // update(pProfesor: Profesor): Promise<Profesor> {
  //   const index = this.profesores.findIndex(profesores => profesores.id === pProfesor.id);
  //   if (index !== -1) {
  //     this.profesores[index] = pProfesor;
  //     return Promise.resolve(pProfesor);
  //   } else {
  //     return Promise.reject(`Profesor with ID ${pProfesor.id} not found.`);
  //   }
  // }

  // delete(pId: number): Promise<any> {
  //   const index = this.profesores.findIndex(profesores => profesores.id === pId);
  //   if (index !== -1) {
  //     this.profesores.splice(index, 1);
  //     return Promise.resolve();
  //   } else {
  //     return Promise.reject(`Profesor with ID ${pId} not found.`);
  //   }
  // }
}
