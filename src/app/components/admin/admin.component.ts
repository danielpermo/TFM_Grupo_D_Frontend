import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  profesArr: any[] = [];
  alumnosArr: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private administradoresService: AdministradoresService) { }

  ngOnInit() {
    this.getProfes();
    this.getAlumnos();
  }

  isProfesoresUrl(): boolean {
    return this.activatedRoute.snapshot.url.some((segment) => segment.path === 'profesores');
  }

  async getProfes() {
    const response = await this.administradoresService.getAllProfes();
    this.profesArr = response;
    return this.profesArr;
  }

  async getAlumnos() {
    const response = await this.administradoresService.getAllAlum();
    this.alumnosArr = response;
    return this.alumnosArr;
  }

  async borrarUsuario(pId: number) {
    const response = await this.administradoresService.delete(pId);
    console.log(response);
    return response;
  }

}
