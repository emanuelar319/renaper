import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usuarioService: UsuariosService,
                private jwtService: JwtService,
                private readonly logger: Logger
                ){}

    // Validar usuario
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usuarioService.getUsuarioPorNombre(username);
        if(!user) throw new NotFoundException('Datos incorrectos'); // El usuario no coincide
        const validPassword = bcryptjs.compareSync(pass, user.password);
        if(user && validPassword){
            const { password, ...result } = user;
            return result;
        }
        throw new NotFoundException('Datos incorrectos'); // EL password no coincide
    }

    // Login
    async login(user: any){
        // this.logger.error('Probando Winston');
        const payload = {
            userId: String(user._doc._id),
            usuario: user._doc.usuario,
            apellido: user._doc.apellido,
            nombre: user._doc.nombre,
            permisos: user._doc.permisos,
            role: user._doc.role
        };
        return {
            token: this.jwtService.sign(payload)
        }
    }


}
