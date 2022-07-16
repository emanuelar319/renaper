import { Document } from 'mongoose';

export interface IRenaper extends Document {
    readonly persona_renaper: string;
    readonly persona: string;
    readonly dni: string;
    readonly sexo: string;
    readonly pais: string;
    readonly ciudad: string;
    readonly provincia: string;
    readonly barrio: string;
    readonly monoblock: string;
    readonly calle: string;
    readonly numero: string;
    readonly piso: string;
    readonly departamento: string;
    readonly codigo_postal: string;
}