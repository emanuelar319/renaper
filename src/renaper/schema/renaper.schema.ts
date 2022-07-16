import { Schema } from 'mongoose';

export const renaperSchema = new Schema({

    persona_renaper: {
      type: String,
      default: ''
    },

    persona: {
      type: String,
      default: ''
    },

    dni: {
      type: String,
      default: ''
    },

    sexo: {
      type: String,
      default: ''
    },

    pais: {
      type: String,
      default: ''
    },

    ciudad: {
      type: String,
      default: ''
    },

    provincia: {
      type: String,
      default: ''
    },

    barrio: {
      type: String,
      default: ''
    },

    monoblock: {
      type: String,
      default: ''
    },

    calle: {
      type: String,
      default: ''
    },

    numero: {
      type: String,
      default: ''
    },

    piso: {
      type: String,
      default: ''
    },

    departamento: {
      type: String,
      default: ''
    },

    codigo_postal: {
      type: String,
      default: ''
    },

},{ collection: 'renaper' });