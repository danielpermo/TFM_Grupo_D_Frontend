import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  profesArr: any[] = []

  constructor(private activatedRoute: ActivatedRoute) { }

  isProfesoresUrl(): boolean {
    return this.activatedRoute.snapshot.url.some((segment) => segment.path === 'profesores');
  }

  getProfes() {

  }

  getAlumnos() {

  }

}
