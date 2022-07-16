import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import fetch from 'node-fetch';
import * as XLSX from 'xlsx';
import * as xl from 'excel4node';

import { IRenaper } from './interface/renaper.interface';
import * as path from 'path';

@Injectable()
export class RenaperService {
  constructor(@InjectModel('Renaper') private readonly renaperModel: Model<IRenaper>){}

  async renaper(): Promise<any> {

    var details = {
      'username': 'munsldatos',
      'password': 'G6uBBH2FF0o472001o2e',
    };
  
    var formBody:any = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    
    formBody = formBody.join("&");

    const respuesta = await fetch("https://apirenaper.idear.gov.ar/CHUTROFINAL/API_ABIS/Autorizacion/token.php",{
        method: 'POST',
        body: formBody,
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    })

    const data = await respuesta.json();

    const workbook = XLSX.readFile('./importar/renaper.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    for(const elemento of dataExcel){
        
        let elementoTMP: any = elemento;
        
        // Se consigue los datos de usuario
    
        const params = new URLSearchParams();
        params.append('dni', '34060398');
        params.append('sexo', 'M');
        
        const response = await fetch(`https://apirenaper.idear.gov.ar/apidatos/porDniSexo.php?dni=${elementoTMP.DNI}&sexo=${elementoTMP.SEXO}`, {
          method: 'GET', 
          headers: {'Authorization': 'Bearer ' + data.data.token},
        });
        
        const dataRenaper = await response.json();
        
        const dataImport = {
          persona_renaper: dataRenaper.apellido + ' ' + dataRenaper.nombres,
          persona: elementoTMP.PERSONA,
          dni: elementoTMP.DNI,
          sexo: elementoTMP.SEXO,
          pais: dataRenaper.pais,
          ciudad: dataRenaper.ciudad,
          provincia: dataRenaper.provincia,
          barrio: dataRenaper.barrio,
          monoblock: dataRenaper.monoblock,
          calle: dataRenaper.calle,
          numero: dataRenaper.numero,
          piso: dataRenaper.piso,
          departamento: dataRenaper.departamento,
          codigo_postal: dataRenaper.codigo_postal,
        }

        const nuevoDato = new this.renaperModel(dataImport);
        await nuevoDato.save();

    }

  }  

  async generarExcel(): Promise<any> {

    // Nos traemos los datos
    const renaper = await this.renaperModel.find();
    console.log(renaper);

    var wb = new xl.Workbook();

    var ws = wb.addWorksheet('Datos de personas');

    ws.cell(1,1).string('Persona_renaper');
    ws.cell(1,2).string('Persona');
    ws.cell(1,3).string('Dni');
    ws.cell(1,4).string('Sexo');
    ws.cell(1,5).string('Pais');
    ws.cell(1,6).string('Provincia');
    ws.cell(1,7).string('Ciudad');
    ws.cell(1,8).string('Barrio');
    ws.cell(1,9).string('Calle');
    ws.cell(1,10).string('Numero');
    ws.cell(1,11).string('Monoblock');
    ws.cell(1,12).string('Departamento');
    ws.cell(1,13).string('Piso');

    ws.column(1).setWidth(40);
    ws.column(2).setWidth(40);

    var fila = 2;

    for(const elemento of renaper){
      ws.cell(fila,1).string(elemento.persona_renaper);
      ws.cell(fila,2).string(elemento.persona);
      ws.cell(fila,3).string(elemento.dni);
      ws.cell(fila,4).string(elemento.sexo);
      ws.cell(fila,5).string(elemento.pais);
      ws.cell(fila,6).string(elemento.provincia);
      ws.cell(fila,7).string(elemento.ciudad);
      ws.cell(fila,8).string(elemento.barrio);
      ws.cell(fila,9).string(elemento.calle);
      ws.cell(fila,10).string(elemento.numero);
      ws.cell(fila,11).string(elemento.monoblock);
      ws.cell(fila,12).string(elemento.departamento);
      ws.cell(fila,13).string(elemento.piso);
      fila += 1;    
    }

    const pathExcel = path.join(__dirname, 'excel', 'personas.xlsx');
  
    wb.write('./personas.xlsx', function(err, stats){})

  }


}
