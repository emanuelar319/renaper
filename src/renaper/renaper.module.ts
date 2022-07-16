import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RenaperController } from './renaper.controller';
import { RenaperService } from './renaper.service';
import { renaperSchema } from './schema/renaper.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Renaper', schema: renaperSchema}]),
  ],
  controllers: [RenaperController],
  providers: [RenaperService]
})
export class RenaperModule {}
