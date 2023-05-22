import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  RegistroForm: FormGroup
  rolSelected!: any

  constructor(private activatedroute: ActivatedRoute, private usuariosService: UsuariosService) {
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
      edad: new FormControl("", []),
      fechaNacimiento: new FormControl("", [
        Validators.required
      ]),
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
    this.activatedroute.params.subscribe(params => {
      console.log(params);
    })
  }

  showProfesorDivs(event: any) {
    if (event.target.value === 'profe') {
      this.rolSelected = 'profe';
    } else {
      this.rolSelected = 'alum';
    }
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
  }



}
