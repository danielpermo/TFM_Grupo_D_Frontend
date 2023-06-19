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
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ValoracionesProfComponent } from './components/valoraciones-prof/valoraciones-prof.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfesorListComponent } from './components/profesor-list/profesor-list.component';



//Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environments';







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
    ValoracionesComponent,
    ValoracionesProfComponent,
    ProfileComponent,
    DialogComponent,
    ProfesorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRadioModule,
    AgmCoreModule.forRoot(environment.googleMaps)
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
