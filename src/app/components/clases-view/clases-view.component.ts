import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-clases-view',
  templateUrl: './clases-view.component.html',
  styleUrls: ['./clases-view.component.css']
})
export class ClasesViewComponent {


  asignaturasArr: any[] = [];
  clasesArr: any[] = [];
  noclasesArr: any[] = [];
  finalizada: string = "";
  myUser: any = {};
  profile: string = "";
  InformacionClases: any[] = [[]];
  clases: any[] = [];
  rowObj: any = {};
  noClase: any[] = [[]];
  noClases:any[] = [];
  loggedUser: number = 0;

  constructor( private router: Router,
    private asignaturasService: AsignaturasService, 
    private clasesService: ClasesService, 
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService,
    private dialog: MatDialog){}

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
      const clasesActivas: any[] =await this.clasesService.getClasesActivas();
      
      this.InformacionClases[1]=[];
      this.InformacionClases[2]=[];
      this.InformacionClases[3]=[];
      this.InformacionClases[4]=[];
      this.InformacionClases[5]=[];
      this.InformacionClases[6]=[];
      this.noClase[1]=[];
      this.noClase[2]=[];
      this.noClase[3]=[];
      this.noClase[4]=[];
      this.noClase[5]=[];
      this.loggedUser=usuarioLogadoId;
      
      if (this.myUser.rol === 'alum') {   
        data.forEach((clase) => {
          if (clase.alumno_id===usuarioLogadoId){
            this.InformacionClases[0].push(clase);
            this.InformacionClases[3].push(clase.finalizado);
            this.InformacionClases[4].push(clase.asignatura_id);
            this.InformacionClases[5].push(clase.profesor_id);
            this.InformacionClases[6].push(clase.id);
          }
          else{
              if(!(this.noClase[4].includes(clase.asignatura_id) || clase.asignatura_id===null)){
                this.noClase[0].push(clase);
                this.noClase[4].push(clase.asignatura_id);
                this.noClase[5].push(clase.profesor_id);
              }    
          }
        })
        this.clases=this.InformacionClases[0];
        this.noClases=this.noClase[0];
        profesores.forEach((element: any)=>{
          this.clases.forEach((element2: any)=>{
            if (element.id===element2.profesor_id){              
              this.InformacionClases[1].push((element.nombre+' '+  element.apellidos)); 
            }        
          })
        })
        profesores.forEach((element: any)=>{
          this.noClases.forEach((element2: any)=>{
            if (element.id===element2.profesor_id){              
              this.noClase[1].push(element.nombre+' '+element.apellidos);
              this.noClase[3].push(element.precio); 
            }       
          })
        })
        this.InformacionClases[0].forEach((asignatura: any)=>{
          asig.forEach((asigna)=>{
            if(asignatura.asignatura_id===asigna.id){
              this.InformacionClases[2].push(asigna.nombre);
            }
          })
        })
        this.noClase[0].forEach((asignatura: any)=>{
          asig.forEach((asigna)=>{
            if(asignatura.asignatura_id===asigna.id){
              this.noClase[2].push(asigna.nombre);
            }
          })
        })
        let i=0;
        while ( i < this.InformacionClases[0].length){
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[2][i],this.InformacionClases[1][i],this.InformacionClases[3] ? 'En curso' : 'Finalizado',this.InformacionClases[4][i],this.InformacionClases[5][i],this.InformacionClases[6][i]]); 
          i++;
        }
        i=0;
        while ( i < this.noClase[2].length){
          this.noclasesArr[i]=Object.assign({}, [this.noClase[2][i],this.noClase[1][i],this.noClase[3][i],this.noClase[0][i],this.noClase[4][i],this.noClase[5][i]]); 
          i++;
        }
      } else if (this.myUser.rol === 'profe') {
        data.forEach((clase) => {
          if (clase.profesor_id===usuarioLogadoId){
            this.InformacionClases[0].push(clase);
            this.InformacionClases[3].push(clase.finalizado);
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
        while ( i <= this.InformacionClases[0].length){
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[1][i],this.InformacionClases[3] ? 'Finalizado' : 'En curso']); 
          i++;
        }
      }
      }
      catch (error) {
       console.error(error);
     }
  }

  apuntarse(event: any, asignatura: number, profesor: number, arr:any[][], alumno_id: number): void {
    var profesor_id: number=0;
    var asignatura_id: number=0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0]===asignatura && arr[i][1]===profesor) 
      profesor_id=arr[i][4];
      asignatura_id=arr[i][5];
    }
    const inscripcion = {
      profesor_id: profesor_id,
      asignatura_id: asignatura_id,
      alumno_id: alumno_id
    };
    this.clasesService.create(inscripcion)
    .then(response => {
      console.log('Registration successful:', response);
      // Refresh the enrolled classes table
      this.getClases();
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  }

  eliminarse(event: any, clase_id: number, alumno_id: number): void {
   
    this.clasesService.delete(clase_id)
    .then(response => {
      console.log('Registration successful:', response);
      // Refresh the enrolled classes table
      this.getClases();
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  }

  valorar(event: any, clase_id: number,alumno_id: number): void {
    this.openDialog(clase_id);
  }

  openDialog(claseId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px', 
      data: { claseId }
    });
  
    dialogRef.afterClosed().subscribe(result => { 
    });
  }
}