import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { AdminComponent } from './components/admin/admin.component';
import { loginGuard } from './guards/login.guards';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/home' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "alumno/:userId", component: AlumnoComponent, canActivate: [loginGuard] },
  { path: "profesor:/:userId", component: ProfesorComponent, canActivate: [loginGuard] },
  { path: "admin", component: AdminComponent },
  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
