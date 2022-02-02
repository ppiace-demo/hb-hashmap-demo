import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users =  await this.usersRepository.find();
    return users.map(user => { 
        delete user.password; 
        return user; 
    });
    
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
        where : {
            username : username
        }
     });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }


  async create(registerUserDto: RegisterUserDto): Promise<User> {
        const { username, password, is_admin } = registerUserDto;
        const user = await this.usersRepository.create({
            username,
            password,
            is_admin
        }).save();
        return user;
    }
}
