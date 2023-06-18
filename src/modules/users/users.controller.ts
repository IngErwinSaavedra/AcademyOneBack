/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dtos';
import { ResponseUserDto } from './dtos/response-user.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private config: ConfigService,
    ) { }

    @Post()
    async createOne(@Body() dto: CreateUserDto) {
        const user = await this.userService.createOne(dto);
        return {
            message: "User Created",
            data: new ResponseUserDto(user)
        };
    }
}
