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
import { MisAlumnosComponent } from './components/mis-alumnos/mis-alumnos.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ClasesComponent } from './components/clases-component/clases-component';
import { ClasesViewComponent } from './components/clases-view/clases-view.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';



//Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ValoracionesProfComponent } from './components/valoraciones-prof/valoraciones-prof.component';
import { ProfileComponent } from './components/profile/profile.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    C404Component,
    LoginComponent,
    RegistroComponent,
    AlumnoComponent,
    ProfesorComponent,
    AdminComponent,
    MenuComponent,
    MisAlumnosComponent,
    UserViewComponent,
    ClasesComponent,
    ClasesViewComponent,
    CalificacionesComponent,
    ValoracionesProfComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
