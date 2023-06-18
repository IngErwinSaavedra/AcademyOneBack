/* eslint-disable prettier/prettier */
import { IsString, MinLength, MaxLength, IsNotEmpty, IsEmail, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    names: string;

    @IsString()
    @MaxLength(255)
    lastnames: string;

    @IsBoolean()
    active: boolean;

    @IsInt()
    @Min(1)
    roleId: number;
}