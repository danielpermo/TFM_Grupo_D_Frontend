import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent implements OnInit {

  token: any = localStorage.getItem('token_user');
  tokenDecode: any = jwtDecode(this.token!);
  profesArr: any[] = [];

  constructor(private alumnosService: AlumnosService) {

  }

  async ngOnInit() {

    const response = await this.alumnosService.getAlumProfes();
    this.profesArr = response;
  }

}
