import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachersapp.onrender.com/api/asignaturas'
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}`));
  }

  getById(pId: any): Promise<any> {
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/${pId}`));
  }

}
