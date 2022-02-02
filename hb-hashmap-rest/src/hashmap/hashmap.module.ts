import { Module } from '@nestjs/common';
import { HashmapService } from './services/hashmap.service';
import { HashmapController } from './hashmap.controller';
import { Hashmap } from './entities/hashmap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/auth/services/user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hashmap]),
    AuthModule
  ],
  controllers: [HashmapController],
  providers: [HashmapService]
})
export class HashmapModule {}
