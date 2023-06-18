/* eslint-disable prettier/prettier */
import { User } from "../entity";

export class ResponseUserDto {
    constructor(user: User) {
        this.body(user);
    }
    private body(user: User) {
        return { id: user.id, names: user.names, lastnames: user.lastnames, username: user.username }
    }
}
