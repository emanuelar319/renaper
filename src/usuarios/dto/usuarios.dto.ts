import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UsuarioDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Nombre de usuario (Ingreso al sistema)' })
    @IsNotEmpty()
    readonly usuario: string;
    
    @ApiProperty({ type: String, required: true, description: 'Documento Nacional de Identidad' })
    @IsNotEmpty()
    readonly dni: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Apellido de la persona' })
    readonly apellido: string;
   
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Nombre de la persona' })
    readonly nombre: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Contraseña de acceso al sistema' })
    password: string;

    @ApiProperty({ type: String, description: 'Correo electronico' })
    readonly email: string;
    
    @ApiProperty({ type: String, description: 'Rol dentro del sistema' })
    readonly role: string;
    
    @ApiProperty({ type: 'Array', description: 'Permisos de usuario'})
    readonly permisos: []

    @ApiProperty({ type: Boolean, default: true, description: 'Usuario activo o inactivo' })
    readonly activo: boolean;

}