import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): string;
    findAllUsers(): Promise<UserEntity[]>;
    createUser(name: string, email: string, password: string): Promise<UserEntity>;
}
