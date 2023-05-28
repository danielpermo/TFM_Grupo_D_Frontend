import { Component, inject } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  profesArr: Profesor[] = [];

  profesoresService = inject(ProfesoresService);

  async getAll() {
    try {
      let response = await this.profesoresService.getAll();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


}
