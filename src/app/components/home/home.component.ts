import { Component, OnInit, inject } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profesArr: any[] = [];

  profesoresService = inject(ProfesoresService);

  ngOnInit() {
    this.getProfes();
  }

  async getProfes() {

    const response = await this.profesoresService.getAll();
    this.profesArr = response;
    return this.profesArr;

  }


}
