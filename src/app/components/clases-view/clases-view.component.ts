import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-clases-view',
  templateUrl: './clases-view.component.html',
  styleUrls: ['./clases-view.component.css']
})
export class ClasesViewComponent {


  asignaturasArr: any[] = [];
  clasesArr: any[] = [];
  finalizada: string = "";
  myUser: any = {};
  profile: string = "";
  InformacionClases: any[] = [[]];
  clases: any[] = [];
  rowObj: any = {};

  constructor( private router: Router,
    private asignaturasService: AsignaturasService, 
    private clasesService: ClasesService, 
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService){}

  async ngOnInit() {
    this.getAsignaturas();
    this.getClases();
 

    const token = localStorage.getItem('token_user');
    const tokenDecode: any = jwtDecode(token!);
    const userType = tokenDecode.usuario_rol;
    if (userType === 'profe') {
      const response = await this.profesoresService.getProfesor();
      this.profile = "PROFESOR";
      this.myUser = response;
      return this.myUser;
    } else if (userType === 'alum') {
      const response = await this.alumnosService.getalumno(tokenDecode.usuario_id);
      this.profile = "ALUMNO";
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
      if (this.myUser.rol === 'alum') {   
        data.forEach((clase) => {
          if (clase.alumno_id===usuarioLogadoId){
            this.InformacionClases[0].push(clase);
          }
        })
        this.InformacionClases[1]=[];
        this.clases=this.InformacionClases[0];
        profesores.forEach((element: any)=>{
          this.clases.forEach((element2: any)=>{
            if (element.id===element2.profesor_id){              
              this.InformacionClases[1].push((element.nombre+' '+  element.apellidos)); 
            }         
          })
        })
        this.InformacionClases[2]=[];
        this.InformacionClases[0].forEach((asignatura: any)=>{
          asig.forEach((asigna)=>{
            if(asignatura.asignatura_id===asigna.id){
              this.InformacionClases[2].push(asigna.nombre);
            }
          })
        })
        let i=0;
        while ( i < this.InformacionClases.length){
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[2][i],this.InformacionClases[1][i],this.InformacionClases[0][i].finalizado ? 'Finalizado' : 'En curso']); 
          i++;
        }
      } else if (this.myUser.rol === 'profe') {
        data.forEach((clase) => {
          if (clase.profesor_id===usuarioLogadoId){
            this.InformacionClases[0].push(clase);
          }
        })
        this.InformacionClases[1]=[];
        this.InformacionClases[0].forEach((asignatura: any )=>{
          asig.forEach((asigna)=>{
            if(asignatura.asignatura_id===asigna.id){
              this.InformacionClases[1].push(asigna.nombre);
            }
          })
        })
        let i=0;
        while ( i <= this.InformacionClases.length){
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[1][i],this.InformacionClases[0][i].finalizado ? 'Finalizado' : 'En curso']); 
          i++;
        }
      }
      }
      catch (error) {
       console.error(error);
     }
  }
}