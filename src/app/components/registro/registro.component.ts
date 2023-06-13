import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import jwtDecode from 'jwt-decode';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  RegistroForm: FormGroup
  rolSelected!: any
  asignaturas: number[] = [];
  myUser: any = {};
  title: string = "REGISTRO";
  buttonName: string = "Regístrate";
  profile: string = "";

  constructor(private usuariosService: UsuariosService, private alumnosService: AlumnosService, private profesoresService: ProfesoresService, private administradoresService: AdministradoresService, private router: Router) {
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
      imagen: new FormControl("", [
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

  async ngOnInit() {
    const token = localStorage.getItem('token_user');
    if (token) {
      const tokenDecode: any = jwtDecode(token!);
      const userType = tokenDecode.usuario_rol;
      this.title = "ACTUALIZAR";
      this.buttonName = "Actualizar";
      if (userType === 'profe') {
        const response = await this.profesoresService.getProfesor();
        this.profile = "Profesor";
        this.myUser = response;
        this.RegistroForm = new FormGroup({
          nombre: new FormControl(this.myUser?.nombre, [
            Validators.required
          ]),
          apellidos: new FormControl(this.myUser?.apellidos, [
            Validators.required
          ]),
          username: new FormControl(this.myUser?.username, [
            Validators.required
          ]),
          email: new FormControl(this.myUser?.email, [
            Validators.required
          ]),
          password: new FormControl("", [
            Validators.required
          ]),
          telefono: new FormControl(this.myUser?.telefono, [
            Validators.required
          ]),
          imagen: new FormControl(this.myUser?.imagen, [
            Validators.required
          ]),
          direccion: new FormControl(this.myUser?.direccion, [
            Validators.required
          ]),
          ciudad: new FormControl(this.myUser?.ciudad, [
            Validators.required
          ]),
          edad: new FormControl(this.myUser?.edad, [
            Validators.required
          ]),
          fechaNacimiento: new FormControl("", []),
          genero: new FormControl(this.myUser?.genero, [
            Validators.required
          ]),
          dni: new FormControl(this.myUser?.dni, [
            Validators.required
          ]),
          rol: new FormControl(this.myUser?.rol, [
            Validators.required
          ]),
          experiencia: new FormControl(this.myUser?.experiencia, [
            Validators.required
          ]),
          precio: new FormControl(this.myUser?.precio, [
            Validators.required
          ]),
          asignaturas: new FormControl(this.myUser?.asignaturas, [
            Validators.required
          ])
        }, []);
      } else if (userType === 'alum') {
        const response = await this.alumnosService.getalumno(tokenDecode.usuario_id);
        this.profile = "Alumno";
        this.myUser = response;
        this.myUser = this.myUser[0];
        this.RegistroForm = new FormGroup({
          nombre: new FormControl(this.myUser?.nombre, [
            Validators.required
          ]),
          apellidos: new FormControl(this.myUser?.apellidos, [
            Validators.required
          ]),
          username: new FormControl(this.myUser?.username, [
            Validators.required
          ]),
          email: new FormControl(this.myUser?.email, [
            Validators.required
          ]),
          password: new FormControl("", [
            Validators.required
          ]),
          telefono: new FormControl(this.myUser?.telefono, [
            Validators.required
          ]),
          imagen: new FormControl(this.myUser?.imagen, [
            Validators.required
          ]),
          direccion: new FormControl(this.myUser?.direccion, [
            Validators.required
          ]),
          ciudad: new FormControl(this.myUser?.ciudad, [
            Validators.required
          ]),
          edad: new FormControl(this.myUser?.edad, [
            Validators.required
          ]),
          fechaNacimiento: new FormControl("", []),
          genero: new FormControl(this.myUser?.genero, [
            Validators.required
          ]),
          dni: new FormControl(this.myUser?.dni, [
            Validators.required
          ]),
          rol: new FormControl(this.profile, [
            Validators.required
          ]),
          experiencia: new FormControl(this.myUser?.experiencia, [
          ]),
          precio: new FormControl(this.myUser?.precio, [
          ])
        }, []);
      } else if (userType === 'admin') {
        const response = await this.administradoresService.getById(tokenDecode.usuario_id);
        this.myUser = response;
        this.profile = "Administrador";
        this.RegistroForm = new FormGroup({
          nombre: new FormControl(this.myUser?.nombre, [
            Validators.required
          ]),
          apellidos: new FormControl(this.myUser?.apellidos, [
            Validators.required
          ]),
          username: new FormControl(this.myUser?.username, [
            Validators.required
          ]),
          email: new FormControl(this.myUser?.email, [
            Validators.required
          ]),
          password: new FormControl("", [
            Validators.required
          ]),
          telefono: new FormControl(this.myUser?.telefono, [
            Validators.required
          ]),
          imagen: new FormControl(this.myUser?.imagen, [
            Validators.required
          ]),
          direccion: new FormControl(this.myUser?.direccion, [
            Validators.required
          ]),
          ciudad: new FormControl(this.myUser?.ciudad, [
            Validators.required
          ]),
          edad: new FormControl(this.myUser?.edad, [
            Validators.required
          ]),
          fechaNacimiento: new FormControl("", []),
          genero: new FormControl(this.myUser?.genero, [
            Validators.required
          ]),
          dni: new FormControl(this.myUser?.dni, [
            Validators.required
          ]),
          rol: new FormControl(this.profile, [
            Validators.required
          ]),
          experiencia: new FormControl(this.myUser?.experiencia, [
          ]),
          precio: new FormControl(this.myUser?.precio, [
          ]),
          asignaturas: new FormControl(this.myUser?.asignaturas, [
          ])
        }, []);
      }
    }
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
    this.router.navigate(['/login']);
  }

  async update() {
    let user: any = this.RegistroForm.value;
    if (this.profile === 'Profesor') {
      const response = await this.profesoresService.updateProfesor(user);
      console.log(response);
      alert('Usuario actualizado correctamente.');
      return response;
    } else if (this.profile === 'alum') {

    }
  }

  isLogged() {
    const token = localStorage.getItem('token_user');
    return (token) ? true : false;
  }


}
