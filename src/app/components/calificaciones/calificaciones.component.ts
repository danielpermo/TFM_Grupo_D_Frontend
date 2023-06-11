import { Component } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {

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
