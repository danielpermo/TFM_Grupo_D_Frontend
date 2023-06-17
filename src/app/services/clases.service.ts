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
      this.httpClient.post<any>(`${this.baseUrl}/clases/`, values, httpOptions)
    );
  }
  delete(idclase: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_user')!
      })
    };
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/clases/${idclase}`, httpOptions));
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