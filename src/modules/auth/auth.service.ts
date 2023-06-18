/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        console.log('info');
        const user = await this.userService.getOneEmailOnlyPassword(email);
        Logger.debug(JSON.stringify(user));

        if (user && compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const { password, email, ...rest } = user;
        const payload = { sub: rest.id };
        return {
            ...rest,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
