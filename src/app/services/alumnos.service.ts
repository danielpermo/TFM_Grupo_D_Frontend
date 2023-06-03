import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl: string;



  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/'
  }

  getAllPublic(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/alumnos`)
    );
  }


}
