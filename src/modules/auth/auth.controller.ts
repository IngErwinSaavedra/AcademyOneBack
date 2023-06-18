/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UseGuards, Req, Request } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/modules/users/entity';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity, @Request() req: any) {
        const data = await this.authService.login(user);
        return { data };
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile() {
        return 'Estos son tus datos';
    }
}
