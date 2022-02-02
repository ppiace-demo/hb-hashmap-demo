import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, Logger } from '@nestjs/common';
import { HashmapService } from './services/hashmap.service';
import { InsertKeyValueDto } from './dto/insert-key-value.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HBHashMap } from './hb-hashmap.impl'
import { Hashmap } from './entities/hashmap.entity';
import { UserService } from 'src/auth/services/user.service';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller()
export class HashmapController {

  private readonly logger = new Logger(HashmapController.name);


  constructor(private readonly hashmapService: HashmapService,
              private readonly userService: UserService ) {}

  @Post('hashmap')
  @UseGuards(JwtAuthGuard)
  async post(@Request() req, @Body() insertKeyValueDto: InsertKeyValueDto) {
    const { key, value } = insertKeyValueDto;
    /* retrive current user */
    const currentUser = await this.userService.findOne(req.user.id)
    this.logger.log(`[Hashmap] User ${currentUser.username} (id: ${currentUser.id}) put key: ${key} => ${value}` );

    /* retrive or init hashmap */
    let userHashmap = await this.hashmapService.findOneByUser(currentUser);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(currentUser);      
    }
    /* put new entry */
    userHashmap.hashmap.put(key, value);
    /* persist */
    return  await this.hashmapService.save(userHashmap);
  }

  @Get('hashmap')
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req) {
    const currentUser = await this.userService.findOne(req.user.id)
    this.logger.log(`[Hashmap] User ${currentUser.username} (id: ${currentUser.id}) get hashmap` );
    return await this.hashmapService.findOneByUser(currentUser);
  }

  @Delete('hashmap/:key')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req, @Param('key') key: string) {
    const currentUser = await this.userService.findOne(req.user.id);
    this.logger.log(`[Hashmap] User ${currentUser.username} (id: ${currentUser.id}) call remove for key: ${key}` );
    let userHashmap = await this.hashmapService.findOneByUser(currentUser);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(currentUser);      
    }
    userHashmap.hashmap.remove(key)
    return await this.hashmapService.save(userHashmap);
  }

  @Delete('hashmap')
  @UseGuards(JwtAuthGuard)
  async clear(@Request() req) {
    const currentUser = await this.userService.findOne(req.user.id)
    this.logger.log(`[Hashmap] User ${currentUser.username} (id: ${currentUser.id}) cleared map` );
    let userHashmap = await this.hashmapService.findOneByUser(currentUser);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(currentUser);      
    }
    userHashmap.hashmap.clear();
    return await this.hashmapService.save(userHashmap);
  }

  /* ADMIN */

  @Post('user/:userId/hashmap')
  @UseGuards(JwtAuthGuard,AdminGuard)
  async postUserHashmap(@Param('userId') userId: string, @Body() insertKeyValueDto: InsertKeyValueDto) {
    const { key, value } = insertKeyValueDto;
    /* retrive user */
    const user = await this.userService.findOne(userId)
    this.logger.log(`[Hashmap][Admin] User ${user.username} (id: ${user.id}) put key: ${key} => ${value}` );

    /* retrive or init hashmap */
    let userHashmap = await this.hashmapService.findOneByUser(user);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(user);      
    }
    /* put new entry */
    userHashmap.hashmap.put(key, value);
    /* persist */
    return  await this.hashmapService.save(userHashmap);
  }
   

  @Get('user/:userId/hashmap')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getUserHashmap( @Param('userId') userId: string) {
    const user = await this.userService.findOne(userId)
    this.logger.log(`[Hashmap][Admin] User ${user.username} (id: ${user.id}) get hashmap` );
    return await this.hashmapService.findOneByUser(user);
  }

  @Delete('user/:userId/hashmap')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async clearUserHashmap(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId)
    this.logger.log(`[Hashmap][Admin] User ${user.username} (id: ${user.id}) cleared map` );
    let userHashmap = await this.hashmapService.findOneByUser(user);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(user);      
    }
    userHashmap.hashmap.clear();
    return await this.hashmapService.save(userHashmap);
  }


  @Delete('user/:userId/hashmap/:key')
  @UseGuards(JwtAuthGuard,AdminGuard)
  async removeUserEntry(@Param('userId') userId: string,@Param('key') key: string) {
    const user = await this.userService.findOne(userId)
    this.logger.log(`[Hashmap][Admin] User ${user.username} (id: ${user.id}) call remove for key: ${key}` );
    let userHashmap = await this.hashmapService.findOneByUser(user);
    if(!userHashmap) {
      userHashmap = await this.hashmapService.create(user);      
    }
    userHashmap.hashmap.remove(key)
    return await this.hashmapService.save(userHashmap);
  }
  
}
