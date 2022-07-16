import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema desarrollado por Equinoccio Technology';
  }
}
