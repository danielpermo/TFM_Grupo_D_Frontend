export interface Profesor {
    id?: number;
    nombre: string;
    apellidos: string;
    username: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    latitud?: number;
    longitud?: number;
    edad: number;
    fecha_nacimiento?: Date;
    genero: string;
    asignaturas: any[];
    dni: string;
    experiencia: number;
    puntuacion: number;
    precio: number;
    fecha_alta?: Date;
    validado?: boolean;
    usuario_id?: number;
    imagen: string;
}
