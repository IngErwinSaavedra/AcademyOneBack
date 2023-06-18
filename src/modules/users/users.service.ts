/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import {
    IPaginationOptions,
    Pagination,
    paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
        return paginate<User>(this.userRepository, options);
    }
    async getMany() {
        return await this.userRepository.find();
    }
    async getOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('usuario no existe');
        return user;
    }
    async createOne(dto: CreateUserDto): Promise<User> {
        const existUser = await this.getOneEmail(dto.email);

        if (existUser) throw new BadRequestException('usuario ya existe');
        const newUser = await this.userRepository.create(dto);
        return await this.userRepository.save(newUser);
    }
    async editOne(id: number, dto: EditUserDto): Promise<User> {
        const user = await this.getOne(id);
        const editedUser = Object.assign(user, dto);
        return await this.userRepository.save(editedUser);
    }
    async deleteOne(id: number): Promise<User> {
        const user = await this.getOne(id);
        return await this.userRepository.softRemove(user);
    }
    async getOneEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        return user;
    }
    async getOneEmailOnlyPassword(email: string) {
        return await this.userRepository
            .createQueryBuilder('users')
            .where({ email })
            .addSelect('users.password')
            .getOne();
    }
}
