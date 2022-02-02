import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt-strategy';
import { UserController } from './controller/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: 'hb-jwt-secret-key', //TODO: move to env or secrets mngm
            signOptions: { expiresIn: '2 days'}
        })  
    ],
    providers: [UserService, AuthService,JwtStrategy],
    exports: [PassportModule, UserService],
    controllers: [AuthController, UserController]
})
export class AuthModule {}
