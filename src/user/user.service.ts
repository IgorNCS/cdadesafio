import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dtos/request/create-user.dto';
import { RegisterUserDTO } from './dtos/request/register-user.dto';
import { UserRepository } from './repositories/user.repository';
import { ViewUserDTO } from './dtos/response/view-user.dto';
import { UserBuilder } from './builder/user.build';
import { hash, compare } from "bcrypt";
import { LoginUserDTO } from './dtos/request/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './dtos/request/update-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async register(registerUser: RegisterUserDTO) {
        if (await this.findByUsername(registerUser.username)) {
            throw new NotFoundException('Username already register');
        }
        if (registerUser.password != registerUser.confirmPassword) {
            throw new NotFoundException('Password are different');
        }

        const hashedPassword = await hash(registerUser.password, 10);

        const createUser: CreateUserDTO = {
            username: registerUser.username,
            password: hashedPassword
        }
        const createdUser = await this.userRepository.create(createUser);
        const createdUserView: ViewUserDTO = UserBuilder.createViewUser(createdUser);

        return createdUserView;




    }

    async login(login: LoginUserDTO) {
        const user = await this.findByUsername(login.username);
        if (!user) {
            throw new UnauthorizedException("Credentials Invalid");
        }
        if (!compare(login.password, user.password)) {
            throw new UnauthorizedException("Credentials Invalid");
        }

        const payload: ViewUserDTO = UserBuilder.createViewUser(user);
        const token = this.jwtService.sign(payload);

        return { payload, token };
    }

    async update(updateUser: UpdateUserDTO, user) {

        if (compare(updateUser.password, user.password)) {
            throw new UnauthorizedException("Credentials Invalid");
        }

        if (updateUser.updatePassword && (updateUser.updatePassword != updateUser.updateConfirmPassword)) {
            throw new NotFoundException('Password are different');
        }
        const updatedUser = await this.userRepository.update(updateUser, user.id)

        const updatedUserView: ViewUserDTO = UserBuilder.createViewUser(updatedUser);

        return updatedUserView;

    }

    async addSlug(slug,id){
        
    }

    async findByUsername(username: string) {
        console.log(await this.userRepository.findByUsername(username))
        return await this.userRepository.findByUsername(username)
    }
}
