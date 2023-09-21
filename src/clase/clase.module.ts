import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { EscuelaModule } from 'src/escuela/escuela.module';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Profesor, Clase]), EscuelaModule],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
