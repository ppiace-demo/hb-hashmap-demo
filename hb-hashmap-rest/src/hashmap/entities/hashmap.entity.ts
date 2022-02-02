import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, BeforeUpdate, AfterLoad, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HBHashMap } from '../hb-hashmap.impl';
import { deserialize, instanceToPlain, plainToInstance, serialize } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class  Hashmap extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    private serializedHashmap: string;

    hashmap: HBHashMap = new HBHashMap();

    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    
    /*Hooks doesn't work, TypeOrm bug?*/
    @BeforeInsert()
    @BeforeUpdate()
    async serializeHashmap() {
        this.serializedHashmap = JSON.stringify(instanceToPlain(this.hashmap));
    }

    @AfterLoad()
    async deserializeHashmap() {
        this.hashmap =  plainToInstance(HBHashMap, JSON.parse( this.serializedHashmap));
    }


}