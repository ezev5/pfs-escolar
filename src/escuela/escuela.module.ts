import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Escuela } from './entities/escuela.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { CiudadModule } from 'src/ciudad/ciudad.module';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Ciudad, Clase]), CiudadModule],
  controllers: [EscuelaController],
  providers: [EscuelaService],
  exports: [EscuelaService]
})
export class EscuelaModule {}
