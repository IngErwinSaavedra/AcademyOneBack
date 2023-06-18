/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/roles/entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Id llave primaria',
    })
    id: number;

    @Column("varchar", {
        name: "username",
        comment: "Nombre del usuario",
        length: 255,
    })
    username: string;

    @Column("varchar", {
        name: "password",
        comment: "Clave del usuario",
        length: 255,
    })
    password: string;

    @Column("varchar", {
        name: "email",
        comment: "Correo electronico del usuario",
        length: 255,
    })
    email: string;

    @Column("varchar", {
        name: "names",
        select: false,
        comment: "Nombre del usuario",
        length: 255
    })
    names: string;

    @Column("varchar", {
        name: "lastnames",
        select: false,
        comment: "Apellido del usuario",
        length: 255
    })
    lastnames: string;

    @Column("varchar", {
        name: "active",
        select: false,
        default: false,
        comment: "Estado del usuario",
        length: 255
    })
    verified: boolean;

    @Column({
        type: 'int',
        name: 'roleId',
        comment: 'Rol del Usuario',
    })
    roleId: number;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @Exclude()
    @CreateDateColumn({
        select: false,
    })
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({
        select: false,
    })
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn({
        select: false,
    })
    deleted_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10);
    }
}
