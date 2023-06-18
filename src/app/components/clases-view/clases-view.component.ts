import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  InformacionClases: any[] = [[],[],[],[],[],[],[]];
  clases: any[] = [];
  rowObj: any = {};
  noClase: any[] = [[],[],[],[],[],[]];
  noClases:any[] = [];
  loggedUser: number = 0;

  constructor( private router: Router,
    private asignaturasService: AsignaturasService, 
    private clasesService: ClasesService, 
    private usuariosService: UsuariosService,
    private profesoresService: ProfesoresService,
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private snack: MatSnackBar){}

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
      this.loggedUser=usuarioLogadoId;

      if (this.myUser.rol === 'alum') {

        //Clases en las que el usuario está apuntado   
        data.forEach((clase) => {
          if (clase.alumno_id===usuarioLogadoId){
            this.InformacionClases[0].push(clase);
            this.InformacionClases[3].push(clase.finalizado);
            this.InformacionClases[4].push(clase.asignatura_id);
            this.InformacionClases[5].push(clase.profesor_id);
            this.InformacionClases[6].push(clase.id);

            profesores.forEach((profe:any)=>{
              if(profe.id===clase.profesor_id){
                this.InformacionClases[1].push(profe.nombre + ' ' + profe.apellidos);
              }
            })

            asig.forEach((asigna)=>{
              //Nombre de Asignaturas a las que el usuario está apuntado 
              this.InformacionClases[0].forEach((asignatura: any)=>{
                if(asignatura.asignatura_id===asigna.id && !(this.InformacionClases[2].includes(asigna.nombre)) ){
                  this.InformacionClases[2].push(asigna.nombre);
                }
              })
            })

          }
        })
        //Clases en las que el usuario no está apuntado y tiene oportunidad de apuntarse
        clasesActivas.forEach((nuevaclase) => {
          data.forEach((clase) => {
            if(!(this.InformacionClases[4].includes(clase.asignatura_id))&& clase.asignatura_id === nuevaclase.asignatura_id && !(this.noClase[4].includes(clase.asignatura_id))){
              this.noClase[0].push(clase);
              this.noClase[4].push(clase.asignatura_id);
              this.noClase[5].push(clase.profesor_id);
            
            //Nombre de profesores de asignaturas
            profesores.forEach((profe:any)=>{
              if(profe.id===clase.profesor_id){
                this.noClase[1].push(profe.nombre + ' ' + profe.apellidos);
                this.noClase[3].push(profe.precio); 
              }
            });
            //Nombres de asignatuaras
            asig.forEach((asigna)=>{
              //Nombre de Asignaturas a las que el usuario está apuntado 
              this.noClase[0].forEach((noAsignatura: any)=>{
                if(asigna.id===clase.asignatura_id && !(this.noClase[2].includes(asigna.nombre))){
                  this.noClase[2].push(asigna.nombre);
                }
              })
            })
          }})
        })
        
        
        //Asignación a objeto para ngfor HTML, clases que cursa el usuario
        let i=0;
        var estado='Finalizado'
        while ( i < this.InformacionClases[0].length){
          
          if(this.InformacionClases[3][i]===1){
            estado='Finalizado';
          }
          else{
            estado='En curso';
          }
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[2][i],this.InformacionClases[1][i],estado,this.InformacionClases[4][i],this.InformacionClases[5][i],this.InformacionClases[6][i]]); 
                    i++;
        }
        console.log(this.clasesArr);
        //Asignación a objeto para ngfor HTML, clases que NO cursa el usuario
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
        while ( i < this.InformacionClases[0].length){
          this.clasesArr[i]=Object.assign({}, [this.InformacionClases[1][i],this.InformacionClases[3] ?  'En curso':'Finalizado']); 
          i++;
        }
      }
      }
      catch (error) {
       console.error(error);
     }
  }

  apuntarse( asignatura: number, profesor: number): void {
   try{
    const inscripcion = {
      profesor_id: profesor,
      asignatura_id: asignatura
    };
    console.log(inscripcion);

    this.clasesService.create(inscripcion)
    .then(response => {
      if (response===null){
        console.log('Registration successful:', 200);
        this.snack.open('Cambios guardados correctamente', 'Aceptar', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
        this.recargar();
      }
      else{
        console.log('Registration was not successful, try again:', response.status);
      }
    })

   }
   catch (error) {
    console.error('Registration failed:', error);
  }
}

  eliminarse(profesorId: number, asignaturaId: number, alumnoId: number): void {
    
    const jotason = {
      profesorId: profesorId,
      asignaturaId: asignaturaId,
      alumnoId: alumnoId
    }
    this.clasesService.delete(jotason)
    .then(response => {
      if(response.changedRows===0){
        console.log('Already finished:');
      }
      else{
        console.log('Succesfully removed from the class:');
      }
      // Refresh the enrolled classes table
      this.recargar();
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  }

  valorar(profesorId:number,loggedUser: number,asignaturaId:number): void {
    this.openDialog(profesorId,loggedUser,asignaturaId);
  }

  openDialog(profesor_id: number,alumno_id: number,asignatura_id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px', 
      data: { profesor_id,alumno_id,asignatura_id }
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => { 
    });
  }

  recargar(): void{
    this.asignaturasArr = [];
    this.clasesArr = [];
    this.noclasesArr = [];
    this.finalizada = "";
    this.InformacionClases = [[],[],[],[],[],[],[]];
    this.clases = [];
    this.rowObj = {};
    this.noClase = [[],[],[],[],[],[]];
    this.noClases = [];

    this.getClases();
  }
}