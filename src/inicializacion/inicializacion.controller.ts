import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InicializacionService } from './inicializacion.service';

@ApiTags('Inicializacion')
@Controller('inicializacion')
export class InicializacionController {

    constructor(private inicializacionService: InicializacionService){}

    // Inicializacion de usuarios
    @ApiOkResponse({ description: 'Usuarios inicializados correctamente' })
    @Get('/usuarios')
    async initUsuarios(@Res() res){
        await this.inicializacionService.initUsuarios();
        res.status(HttpStatus.OK).json({
            message: 'Inicializacion de usuarios completado correctamente'
        })
    } 

}
