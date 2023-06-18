import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EditUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    names: string;

    @IsString()
    @MaxLength(255)
    lastnames: string;
}