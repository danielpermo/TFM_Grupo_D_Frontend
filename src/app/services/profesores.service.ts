import { Injectable } from '@angular/core';
import { profesores } from '../db/profesores.db';
import { Profesor } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

private profesores: Profesor[];



  constructor() { 
    this.profesores = profesores
  }

  getAll(): Promise<any> {
    return Promise.resolve(profesores);
  }
  

  getById(pId: number): Promise<any> {
    return Promise.resolve(this.profesores.find(profesores => profesores.id === pId));
  }

  create(pProfesor: Profesor): Promise<Profesor> {
    const newId = Number(this.profesores.length + 1);
    const newProfesor = { ...pProfesor, id: newId };
    this.profesores.push(newProfesor);
    return Promise.resolve(newProfesor);
  }

  update(pProfesor: Profesor): Promise<Profesor> {
    const index = this.profesores.findIndex(profesores => profesores.id === pProfesor.id);
    if (index !== -1) {
      this.profesores[index] = pProfesor;
      return Promise.resolve(pProfesor);
    } else {
      return Promise.reject(`Profesor with ID ${pProfesor.id} not found.`);
    }
  }

  delete(pId: number): Promise<any> {
    const index = this.profesores.findIndex(profesores => profesores.id === pId);
    if (index !== -1) {
      this.profesores.splice(index, 1);
      return Promise.resolve();
    } else {
      return Promise.reject(`Profesor with ID ${pId} not found.`);
    }
  }
}