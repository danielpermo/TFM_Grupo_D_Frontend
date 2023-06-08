import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { AlumnoDetailsComponent } from './components/alumno-details/alumno-details.component';
import { MisAlumnosComponent } from './components/mis-alumnos/mis-alumnos.component';
import { UserViewComponent } from './components/user-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    C404Component,
    LoginComponent,
    RegistroComponent,
    AlumnoComponent,
    AlumnoDetailsComponent,
    ProfesorComponent,
    AdminComponent,
    MenuComponent,
    MisAlumnosComponent,
    UserViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [AlumnoComponent, AlumnoDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
