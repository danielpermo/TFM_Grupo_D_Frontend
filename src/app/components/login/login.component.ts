import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute) {
    this.UserForm = new FormGroup({
      usuario: new FormControl("", [
        Validators.required
      ]),
      contraseña: new FormControl("", [
        Validators.required
      ])
    }, []);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    })

  }


  checkControl(pControlName: string, pError: string): boolean {
    if (this.UserForm.get(pControlName)?.hasError(pError) && this.UserForm.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  login() {
    let user: any = this.UserForm.value;
    console.log(user);
  }



}



