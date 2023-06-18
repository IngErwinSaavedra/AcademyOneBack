/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos';


@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async createOne(dto: CreateRoleDto): Promise<Role> {
        const existUser = await this.getOneRole(dto.name);

        if (existUser) throw new BadRequestException('usuario ya existe');
        const newRole = await this.roleRepository.create(dto);
        return await this.roleRepository.save(newRole);
    }

    async getOneRole(name: string) {
        const role = await this.roleRepository.findOne({
            where: {
                name,
            },
        });
        return role;
    }
}
