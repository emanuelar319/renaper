import { Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autenticacion')
@Controller()
export class AppController {
  
  constructor(private authService: AuthService,
              private jwtService: JwtService){}

  // Login
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req){
    return this.authService.login(req.user);
  } 

  // Profile + Renovacion de token
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async profile(@Req() req) {
    // Generacion de token
    const token = this.jwtService.sign(req.user);
    return {
      usuario: req.user,
      token: 'bearer ' + token
    };
  }

  
}
