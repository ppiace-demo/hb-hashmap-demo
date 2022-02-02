import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { RegisterUserDto } from '../dto/registerUser.dto'
import { LoginDto } from '../dto/login.dto';


export interface AuthResponse {
    success : boolean,
    message: string
    access_token?: string
}

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);
    
    constructor(private userService: UserService, private jwtService: JwtService){}


    async register(registerUserDto: RegisterUserDto): Promise<AuthResponse> {    
      
      
        this.logger.log("Try register user: ", registerUserDto);    
        
        //CHECK username
        {
          const user = await this.userService.findOneByUsername(registerUserDto.username);
          if(user){
            return {
              success : false,
              message: 'Username already in use.'
          };            
          }
        }
        try {
          const user = await this.userService.create(registerUserDto);
          const payload = {
                id: user.id,
                is_admin: user.is_admin
            };
        
            return {
                success : true,
                message: 'OK',
                access_token: this.jwtService.sign(payload),
            };
        } catch (err) {
          this.logger.log("Error in creating user: ", err);
          throw new BadRequestException();
        }
        
      }

      async login(loginDTO: LoginDto): Promise<AuthResponse>  {
        const user = await this.validateUser(loginDTO);
    
        const payload = {
          id: user.id,
          is_admin: user.is_admin
        };
    
        return {
          message: 'OK',
          success: true,
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async validateUser(loginDTO: LoginDto): Promise<User> {
        const { username, password } = loginDTO;
    
        const user = await this.userService.findOneByUsername(username);
        if (!(await user?.comparePassword(password))) {
          throw new UnauthorizedException();
        }
    
        return user;
      }
}