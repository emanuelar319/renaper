import { Document } from 'mongoose';

export interface IUsuario extends Document {
    readonly usuario: string;
    readonly dni: string;
    readonly apellido: string;
    readonly nombre: string;
    password: string;
    readonly email: string;
    readonly role: string;
    readonly permisos: [];
    readonly activo: boolean;
}