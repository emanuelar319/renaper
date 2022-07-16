import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Logger],
  exports: [AuthService]
})
export class AuthModule {}
