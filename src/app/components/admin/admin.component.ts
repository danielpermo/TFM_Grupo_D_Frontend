import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  profesArr: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private profesoresService: ProfesoresService) { }

  ngOnInit() {
    this.getProfes();
  }

  isProfesoresUrl(): boolean {
    return this.activatedRoute.snapshot.url.some((segment) => segment.path === 'profesores');
  }

  async getProfes() {
    const response = await this.profesoresService.getAllAdmin();
    this.profesArr = response;
    console.log(this.profesArr);
    return this.profesArr;
  }

  getAlumnos() {

  }

}
