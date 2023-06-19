import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  latitud: number = 0;
  longitud: number = 0;
  profesArr: any[] = [];

  constructor(private profesoresService: ProfesoresService) { }

  async ngOnInit() {
    this.profesArr = await this.profesoresService.getAllPublic();

    navigator.geolocation.getCurrentPosition(posicion => {
      this.latitud = posicion.coords.latitude;
      this.longitud = posicion.coords.longitude;
    })

  }

}
