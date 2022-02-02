import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const user = await this.userService.findOne(req.user.id);;
      return user.is_admin;
    }
  }