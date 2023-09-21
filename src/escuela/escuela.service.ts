import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';
import { CiudadService } from 'src/ciudad/ciudad.service';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
    private ciudadService: CiudadService,
  ) {}

  async create(createEscuelaDto: CreateEscuelaDto) {
    const ciudad = await this.ciudadService.findOne(createEscuelaDto.idCiudad);

    if (!ciudad)
      return new HttpException('Ciudad not found', HttpStatus.NOT_FOUND);

    const escuela = this.escuelaRepository.create(createEscuelaDto);
    escuela.ciudad = ciudad;
    return this.escuelaRepository.save(escuela);
  }

  findAll() {
    return this.escuelaRepository.find({
      relations: ['ciudad']
    });
  }

  findOne(id: number) {
    return this.escuelaRepository.findOne({
      where: {
        idEscuela: id
      },
      relations: ['ciudad']
    });
  }

  update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    return `This action updates a #${id} escuela`;
  }

  remove(id: number) {
    return `This action removes a #${id} escuela`;
  }
}
