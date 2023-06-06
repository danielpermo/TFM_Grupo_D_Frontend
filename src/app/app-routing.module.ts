import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { MisAlumnosComponent} from './components/mis-alumnos/mis-alumnos.component';
import { AdminComponent } from './components/admin/admin.component';
import { loginGuard } from './guards/login.guards';
import { roleGuard } from './guards/role.guard';
import { AlumnoDetailsComponent } from './components/alumno-details/alumno-details.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/home' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "alum/:userId", component: AlumnoComponent, canActivate: [loginGuard] },
  { path: "profe/:userId", component: ProfesorComponent, canActivate: [loginGuard] },
  { path: "profe/:userId/misAlumnos", component: MisAlumnosComponent },
  { path: "admin/:userId", component: AdminComponent, canActivate: [loginGuard, roleGuard] },
  { path: "admin/:userId/alumnos", component: AdminComponent, canActivate: [loginGuard, roleGuard] },
  { path: "admin/:userId/profesores", component: AdminComponent, canActivate: [loginGuard, roleGuard] },
  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
