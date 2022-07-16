import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import * as bcryptjs from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor( private usuariosService: UsuariosService ){}

    // Usuario por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getUsuario(@Res() res, @Param('id') usuarioID) {
        const usuario = await this.usuariosService.getUsuario(usuarioID);
        res.status(HttpStatus.OK).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    }

    // Listar usuarios
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarUsuarios(@Res() res, @Query() querys) {
        const usuarios = await this.usuariosService.listarUsuarios(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de usuarios correcto',
            usuarios
        });
    }

    // Crear usuario
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearUsuario(@Res() res, @Body() usuarioDTO: UsuarioDTO ) {

        const { password } = usuarioDTO;

        // Se encripta el password
        const salt = bcryptjs.genSaltSync();
        usuarioDTO.password = bcryptjs.hashSync(password, salt);

        // Se crea el nuevo usuario
        const usuarioCreado = await this.usuariosService.crearUsuario(usuarioDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });
    
        }

    // Actualizar usuario
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarUsuario(@Res() res, @Body() usuarioUpdateDTO: UsuarioUpdateDTO, @Param('id') usuarioID ) {

        const { password } = usuarioUpdateDTO;

        if(password){
            const salt = bcryptjs.genSaltSync();
            usuarioUpdateDTO.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await this.usuariosService.actualizarUsuario(usuarioID, usuarioUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado correctamente',
            usuario
        });

    }

}
