import { Injectable } from '@nestjs/common';
import { Connection, EntitySchema, ObjectType, Repository } from 'typeorm';
import {config} from "@src/config";
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectConnection(config.db.client.name) public clientConnection: Connection
    ) {}
    
    async getRepository<T>(entity: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>> {
        return this.clientConnection.getRepository(entity);
    }
}