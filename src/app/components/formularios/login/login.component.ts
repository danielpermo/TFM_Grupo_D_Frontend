import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) { //Meter a la derecha de activatedRoute el servicio (userService)
    this.UserForm = new FormGroup({
      username: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    })
  }

  ngOnInit() {

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
