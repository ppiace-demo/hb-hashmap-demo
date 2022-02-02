import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthResponse, AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDTO: LoginDto): Promise<AuthResponse> {
      return this.authService.login(loginDTO);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponse> {
      return this.authService.register(registerUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('test')
    async test() {
      return 'Success!';
    }
}
