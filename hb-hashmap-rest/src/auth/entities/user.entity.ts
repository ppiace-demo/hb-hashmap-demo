import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Hashmap } from 'src/hashmap/entities/hashmap.entity';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  @Column({ default : false})
  is_admin: boolean;

  @Column()
  password: string;

  
  @OneToOne(type => Hashmap, hashmap => hashmap.user, { eager: true })
  hashmap: Hashmap;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  
  
}