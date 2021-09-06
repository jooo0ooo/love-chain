import { Inject, Injectable } from '@nestjs/common';
import { Connection, EntitySchema, ObjectType, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(@Inject('Connection') public connection: Connection) {}
    
    async getRepository<T>(entity: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>> {
        return this.connection.getRepository(entity);
    }
}