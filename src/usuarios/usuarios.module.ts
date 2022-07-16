import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usuarioSchema } from './schema/usuarios.schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Usuario', schema: usuarioSchema}])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService]
})
export class UsuariosModule {}
