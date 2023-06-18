import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
// @ts-ignore
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  profesArr: any[] = [];
  alumnosArr: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private administradoresService: AdministradoresService
  ) { }

  ngOnInit() {
    this.getProfes();
    this.getAlumnos();
  }

  isProfesoresUrl(): boolean {
    return this.activatedRoute.snapshot.url.some((segment) => segment.path === 'profesores');
  }

  async getProfes() {
    const response = await this.administradoresService.getAllProfes();
    this.profesArr = response;
    return this.profesArr;
  }

  async getAlumnos() {
    const response = await this.administradoresService.getAllAlum();
    this.alumnosArr = response;
    return this.alumnosArr;
  }

  async borrarUsuario(pId: number) {
    const user = await this.administradoresService.getById(pId);
    Swal.fire({
      title: `¿Desea borrar el usuario ${user.nombre}?`,
      text: "Si lo haces, ¡no podrás volver atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#082147',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.administradoresService.delete(pId);
        console.log(response);

        Swal.fire(
          '¡Eliminado!',
          `El usuario ${user.nombre} ha sido borrado correctamente`,
          'success'
        )

        return response
      }
    })
  }

  async validate(pId: number) {
    const isValidate = await this.administradoresService.getById(pId);
    console.log(isValidate.validado)
    if (isValidate.validado === 1 || isValidate.validado === undefined) {
      return alert('Usuario ya validado.')
    }
    const response = await this.administradoresService.validateProfe(pId);
    console.log(response);
    alert('Validación realizada correctamente.')
    window.location.reload();
    return response;
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
