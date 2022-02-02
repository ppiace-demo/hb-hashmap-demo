import { Controller, Get, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../admin.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('all')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async allUser(@Request() req) {
        return await this.userService.findAll();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(@Request() req) {
        return await this.userService.findOne(req.user.id);
    }

    @Delete(':userId')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async delete( @Param('userId') userId: string) {
        return await this.userService.remove(userId);
    }

    @Get('/:userId')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async getuser( @Param('userId') userId: string) {
        let user =  await this.userService.findOne(userId);
        delete user.password; 
        return user;
    }

}
