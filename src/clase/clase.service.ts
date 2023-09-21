import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EscuelaService } from 'src/escuela/escuela.service';
import { Clase } from './entities/clase.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
    private escuelaService: EscuelaService,
  ) {}

  async create(createClaseDto: CreateClaseDto) {
    const escuela = await this.escuelaService.findOne(createClaseDto.idEscuela);

    if (!escuela)
      return new HttpException('Escuela no encontrada.', HttpStatus.NOT_FOUND);

    const clase = this.claseRepository.create(createClaseDto);
    clase.escuela = escuela;
    return this.claseRepository.save(clase); 
  }

  findAll() {
    return this.claseRepository.find({
      relations: ['escuela', 'escuela.ciudad', 'escuela.ciudad.barrio']
    });
  }

  findOne(id: number) {
    return this.claseRepository.findOneBy({ idClase: id});
  }

  async update(id: number, updateClaseDto: UpdateClaseDto) {
    await this.findOne(id);

    try {
      const escuela = await this.escuelaService.findOne(updateClaseDto.idEscuela);
      const result = await this.claseRepository.update(
        { idClase: id },
        { idClase: id,
          nombre: updateClaseDto.nombre,
          escuela: escuela
        },
      );

      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} clase`;
  }
}
