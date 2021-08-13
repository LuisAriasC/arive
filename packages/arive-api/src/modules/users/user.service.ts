import { QueryService } from '@nestjs-query/core';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongooseQueryService } from '@nestjs-query/query-mongoose';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import { ClientSession, Connection, Model } from 'mongoose';
import { UserInputDTO } from './dto/user-input.dto';
import { UserDTO } from './dto/user.dto';
import { UserTransformer } from './user.transformer';
import { UserUpdateDTO } from './dto/user-update.dto';
import { HobbyService } from '../hobbies/hobby.service';

@QueryService(UserEntity)
export class UserService extends MongooseQueryService<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name) readonly model: Model<UserEntity>,
    @InjectConnection()  private mongooseConnection: Connection,
    readonly userTransformer: UserTransformer,
    readonly hobbyService: HobbyService,
  ) {
    super(model);
  }

  // Create users with transactions
  public async createUsers(
    users: Array<UserInputDTO>,
    session: ClientSession
  ): Promise<Array<UserEntity>>{
    return await this.model.create(
      users.map(u => ({
        name: u.name,
        createdAt: new Date(),
        updatedAt: new Date()
      })), 
      {
        session
      }
    )
  }

  // Create one user with transaction
  public async createOneUser(
    input: UserInputDTO
  ): Promise<UserDTO> {
    const session = await this.mongooseConnection.startSession();
    await session.startTransaction();

    try {
      const [created] = await this.createUsers([input], session);
      await session.commitTransaction();
      return this.userTransformer.fromEntityToDTO(created);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  // Get one user by id
  public async getUser(
    id: string,
  ): Promise<UserDTO>{
    try {
      const found = await this.model.findById(id);
      return this.userTransformer.fromEntityToDTO(found);
    } catch (error) {
      throw error;
    }
  }

  // Update one user by id
  public async updateOneUser(
    id: string,
    user: UserUpdateDTO,
  ): Promise<UserDTO>{
    try {
      const updated = await this.model.findByIdAndUpdate(
        id,
        user
      );
      updated.name = user.name;
      return this.userTransformer.fromEntityToDTO(updated);
    } catch (error) {
      throw error;
    }
  }

  // Delete one user with soft delete
  public async deleteOneUser(
    id: string,
  ): Promise<UserDTO>{

    const session = await this.mongooseConnection.startSession();
    await session.startTransaction();

    try {
      const deleted = await this.model.findByIdAndDelete(
        id,
        {
          session
        }
      );
      await this.hobbyService.deleteHobbiesByUser(id, session);
      await session.commitTransaction();
      return this.userTransformer.fromEntityToDTO(deleted);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  // List users
  public async listUsers(): Promise<Array<UserDTO>>{
    try {
      const listed = await this.model.find({
        deletedAt: null
      });
      return listed.map(l => { return this.userTransformer.fromEntityToDTO(l) })
    } catch (error) {
      throw error;
    }
  }
}
