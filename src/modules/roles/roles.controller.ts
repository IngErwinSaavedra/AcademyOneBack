/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './dtos';
import { RolesService } from './roles.service';
import { ResponseRoleDto } from './dtos/response-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly roleService: RolesService
    ) { }

    @Post()
    async createOne(@Body() dto: CreateRoleDto) {
        const role = await this.roleService.createOne(dto);
        return {
            message: 'Role creeated successfully',
            data: new ResponseRoleDto(role)
        }
    }
}
