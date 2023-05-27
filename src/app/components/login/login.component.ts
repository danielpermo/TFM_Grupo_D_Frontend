import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsuariosService, private router: Router) {
    this.UserForm = new FormGroup({
      email: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    }, []);
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params);
    // })

  }


  checkControl(pControlName: string, pError: string): boolean {
    if (this.UserForm.get(pControlName)?.hasError(pError) && this.UserForm.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  async onSubmit() {
    let user: any = this.UserForm.value;
    const response = await this.usuariosService.login(user);
    const fatal = 'Error: email y/o contraseña no válidos'
    console.log(response);
    if (response === fatal) {
      return alert(response);
    }

    localStorage.setItem('token_user', response.token);
    this.router.navigate(['/alumno', 25])
  }

}



