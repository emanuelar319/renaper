import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { RenaperService } from './renaper.service';

@Controller('renaper')
export class RenaperController {

    constructor(private renaperService: RenaperService){}

    // Conexion con renaper
    @Get('/renaper')
    async renaper(@Res() res){
        await this.renaperService.renaper();
        res.status(HttpStatus.OK).json({
            message: 'Conexion con renaper correcta'
        })
    } 

    // Conexion con renaper
    @Get('/renaper/excel')
    async renaperExcel(@Res() res){
        await this.renaperService.generarExcel();
        res.status(HttpStatus.OK).json({
            message: 'Excel generado correctamente'
        })
    } 
}
