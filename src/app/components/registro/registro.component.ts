import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  RegistroForm: FormGroup
  rolSelected!: any
  asignaturas: number[] = [];

  constructor(private activatedroute: ActivatedRoute, private usuariosService: UsuariosService, private router: Router) {
    this.RegistroForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required
      ]),
      apellidos: new FormControl("", [
        Validators.required
      ]),
      username: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ]),
      telefono: new FormControl("", [
        Validators.required
      ]),
      direccion: new FormControl("", [
        Validators.required
      ]),
      ciudad: new FormControl("", [
        Validators.required
      ]),
      edad: new FormControl("", [
        Validators.required
      ]),
      fechaNacimiento: new FormControl("", []),
      genero: new FormControl("", [
        Validators.required
      ]),
      dni: new FormControl("", [
        Validators.required
      ]),
      rol: new FormControl("", [
        Validators.required
      ]),
      experiencia: new FormControl("", [
        Validators.required
      ]),
      precio: new FormControl("", [
        Validators.required
      ]),
      asignaturas: new FormControl("", [
        Validators.required
      ])
    }, []);
  }

  ngOnInit() {
    // this.activatedroute.params.subscribe(params => {
    //   // console.log(params);
    // })
  }

  showProfesorDivs(event: any) {
    if (event.target.value === 'profe') {
      this.rolSelected = 'profe';
    } else {
      this.rolSelected = 'alum';
    }
  }

  toggleCheckbox(value: number) {
    const index = this.asignaturas.indexOf(value);
    if (index > -1) {
      this.asignaturas.splice(index, 1); // Eliminar asignatura si ya está seleccionada
    } else {
      this.asignaturas.push(value); // Agregar asignatura si no está seleccionada
    }
    this.RegistroForm.get('asignaturas')!.setValue(this.asignaturas)
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.RegistroForm.get(pControlName)?.hasError(pError) && this.RegistroForm.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }


  async onSubmit() {
    let user: any = this.RegistroForm.value;
    const response = await this.usuariosService.registro(user)
    console.log(response);
    if (response.fatal) {
      return alert(response.fatal);
    }
    alert('Usuario registrado correctamente');
    this.router.navigate(['/login'])

    // const rol = this.RegistroForm.get('rol')?.value;
    // if (rol === 'alum') {
    //   this.router.navigate(['/alumno', response.id]);
    // } else {
    //   this.router.navigate(['/profesor', response.id]);
    // }
  }



}
