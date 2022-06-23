import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/bun-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService){}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user =  await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if(role && user) {
            await user.$add('roles', role.id)
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user =  await this.userRepository.findByPk(dto.userId);
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
