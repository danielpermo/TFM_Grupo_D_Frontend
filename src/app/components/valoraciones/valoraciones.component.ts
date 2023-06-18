import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  asignaturasArr: any[] = [];
  clasesArr: any[] = [];
  finalizada: string = "";
  myUser: any = {};
  profile: string = "";
  clase: any = {}; 

  dataValoraciones: any[] = [[]];
  clases: any[] = [];
  constructor(
    private asignaturasService: AsignaturasService,
    private clasesService: ClasesService,
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService
  ) {}

  async ngOnInit() {
    this.getAsignaturas();
    this.getClases();

    const token = localStorage.getItem('token_user');
    const tokenDecode: any = jwtDecode(token!);
    const userType = tokenDecode.usuario_rol;
    if (userType === 'profe') {
      const response = await this.profesoresService.getProfesor();
      this.profile = 'PROFESOR';
      this.myUser = response;
      return this.myUser;
    } else if (userType === 'alum') {
      const response = await this.alumnosService.getalumno(tokenDecode.usuario_id);
      this.profile = 'ALUMNO';
      this.myUser = response;
      this.myUser = this.myUser[0];
      return this.myUser;
    }
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
      const asig: any[] = await this.asignaturasService.getAll();
      const profesores: any = await this.profesoresService.getAllPublic();
      this.dataValoraciones[1]=[];
      this.dataValoraciones[2]=[];
      this.dataValoraciones[3]=[];
      this.dataValoraciones[4]=[];
      this.dataValoraciones[5]=[];
      if (this.myUser.rol === 'alum') {

        data.forEach((clase) => {
          if (clase.alumno_id===usuarioLogadoId){
            this.dataValoraciones[0].push(clase);
            this.dataValoraciones[1].push(clase.opinion);
            this.dataValoraciones[2].push(clase.asignatura_id);
            this.dataValoraciones[3].push(clase.profesor_id);
          }}
        )
          this.clases=this.dataValoraciones[0];
        profesores.forEach((element: any)=>{
          this.clases.forEach((element2: any)=>{
            if (element.id===element2.profesor_id){              
              this.dataValoraciones[4].push((element.nombre+' '+  element.apellidos)); 
            }        
          })
        })
        this.dataValoraciones[0].forEach((asignatura: any)=>{
          asig.forEach((asigna)=>{
            if(asignatura.asignatura_id===asigna.id){
              this.dataValoraciones[5].push(asigna.nombre);
            }
          })
        })
        let i=0;
        while ( i < this.dataValoraciones[0].length){
          this.clasesArr[i]=Object.assign({}, [this.dataValoraciones[5][i], this.dataValoraciones[4][i], this.dataValoraciones[1][i]]); 
          i++;
        }
    }
    }catch (error) {
      console.error(error);
  }
}
}
