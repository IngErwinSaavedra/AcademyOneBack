/* eslint-disable prettier/prettier */
import { Role } from '../entity';

export class ResponseRoleDto {
    constructor(role: Role) {
        this.body(role);
    }
    private body(role: Role) {
        return { id: role.id, name: role.name, description: role.description }
    }
}
