import { ConfigService } from "@nestjs/config";
import { User } from "src/modules/users/entity";
import { getRepository } from "typeorm";
import { DEFAULT_USER_LASTNAMES, DEFAULT_USER_NAMES, DEFAULT_USER_USERNAME, DEFAULT_USER_PASSWORD } from './constants';

export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User);

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('username = :username', { username: config.get<string>(DEFAULT_USER_USERNAME) })
        .getOne()

    if (!defaultUser) {
        const adminUser = userRepository.create({
            names: config.get<string>(DEFAULT_USER_NAMES),
            lastnames: config.get<string>(DEFAULT_USER_LASTNAMES),
            username: config.get<string>(DEFAULT_USER_USERNAME),
            password: config.get<string>(DEFAULT_USER_PASSWORD),

        })
        return await userRepository.save(adminUser);
    }

}