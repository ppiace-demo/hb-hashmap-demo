import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Hashmap } from '../entities/hashmap.entity';
import { HBHashMap } from '../hb-hashmap.impl';

@Injectable()
export class HashmapService {


  constructor(
    @InjectRepository(Hashmap)
    private hashmapRepository: Repository<Hashmap>,
  ) { }


  async create(user: User, hbHashmap?: HBHashMap): Promise<Hashmap> {

    const hashmap = await this.hashmapRepository.create({
      user: user,
      hashmap: hbHashmap || new HBHashMap()
    });
    hashmap.serializeHashmap()
    return this.hashmapRepository.save(hashmap);;
  }

  async save(hashmap: Hashmap): Promise<Hashmap> {
    hashmap.serializeHashmap()
    return await this.hashmapRepository.save(hashmap);
  }

  findOneByUser(user: User,) {
    return this.hashmapRepository.findOne({
      where: {
        user: user
      }
    });
  }

}
