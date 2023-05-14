export interface Profesor {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    latitud: number;
    longitud: number;
    edad: number;
    fecha_nacimiento: Date;
    genero: string;
    dni: string;
    experiencia: number;
    precio: number;
    fecha_alta: Date;
    validado: boolean;
    usuario_id: number;
}