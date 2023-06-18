import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Id llave primaria',
    })
    id: number;

    @Column('varchar', {
        name: "name",
        comment: 'Nombre del rol',
        length: 255,
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        comment: 'Descripcion del rol',
        length: 255,
    })
    description: string;
}