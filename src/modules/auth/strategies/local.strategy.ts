/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        if (!user)
            throw new UnauthorizedException('user or password not exist');
        return user;
    }
}