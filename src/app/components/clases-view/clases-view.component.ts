import { Component } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { UsuariosService } from 'src/app/services/usuarios.service';



<<<<<<< HEAD
=======
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

>>>>>>> develop
@Component({
  selector: 'app-clases-view',
  templateUrl: './clases-view.component.html',
  styleUrls: ['./clases-view.component.css']
})
export class ClasesViewComponent {


  asignaturasArr: any[] = [];
  clasesArr: any[] = [];



  constructor(private asignaturasService: AsignaturasService, 
    private clasesService: ClasesService, 
    private usuariosService: UsuariosService){}

  ngOnInit() {
    this.getAsignaturas();
    this.getClases();
  }

  async getAsignaturas() {
    try {
      const response: any[] = await this.asignaturasService.getAll();
      this.asignaturasArr = response;
    } catch (error) {
      console.error(error);
    }
  }
  

  async getClases() {
    try {
      const data: any[] = await this.clasesService.getAll();
      const usuarioLogadoId: number = this.usuariosService.getId();


      console.log('ID del usuario logado:', usuarioLogadoId);
  
      this.clasesArr = data.map((clase: any) => {
        const asignatura = this.asignaturasArr.find(
          (asignatura: any) => asignatura.id === clase.asignatura_id
        );
        return {
          ...clase,
          asignatura_nombre: asignatura ? asignatura.nombre : '',
          asignatura_rama: asignatura ? asignatura.rama : ''
        };
      }).filter((clase: any) => clase.alumno_id === usuarioLogadoId);
    } catch (error) {
      console.error(error);
    }
  }

}