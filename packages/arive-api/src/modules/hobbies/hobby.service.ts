import { QueryService } from '@nestjs-query/core';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongooseQueryService } from '@nestjs-query/query-mongoose';
import { HobbyEntity } from 'src/modules/hobbies/entity/hobby.entity';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { HobbyTransformer } from './hobby.transformer';
import { HobbyInputDTO } from './dto/hobby-input.dto';
import { HobbyDTO } from './dto/hobby.dto';
import { HobbyUpdateDTO } from './dto/hobby-update.dto';

@QueryService(HobbyEntity)
export class HobbyService extends MongooseQueryService<HobbyEntity> {
  constructor(
    @InjectModel(HobbyEntity.name) readonly model: Model<HobbyEntity>,
    @InjectConnection() private mongooseConnection: Connection,
    readonly hobbyTransformer: HobbyTransformer,
  ) {
    super(model);
  }

  // Create hobbies with transactions
  public async createHobbies(
    hobbies: Array<HobbyInputDTO>,
    session: ClientSession
  ): Promise<Array<HobbyEntity>>{
    return await this.model.create(
      hobbies.map(u => ({
        name: u.name,
        passionLevel: u.passionLevel,
        year: u.year,
        user: u.user,
        createdAt: new Date(),
        updatedAt: new Date()
      })), 
      {
        session
      }
    )
  }
  
  // Create one hobby with transaction
  public async createOneHobby(
    input: HobbyInputDTO
  ): Promise<HobbyDTO> {
    const session = await this.mongooseConnection.startSession();
    await session.startTransaction();

    try {
      const [created] = await this.createHobbies([input], session);
      await session.commitTransaction();
      return this.hobbyTransformer.fromEntityToDTO(created);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
  
  // Get one hobby by id
  public async getHobby(
    id: string,
  ): Promise<HobbyDTO>{
    try {
      const found = await this.model.findById(id);
      return this.hobbyTransformer.fromEntityToDTO(found);
    } catch (error) {
      throw error;
    }
  }

  // Update one hobby by id
  public async updateOneHobby(
    id: string,
    hobby: HobbyUpdateDTO,
  ): Promise<HobbyDTO>{
    try {
      if(hobby.user) {

      } else {

      }
      const updated = await this.model.findByIdAndUpdate(
        id,
        hobby
      );
      if(hobby.name) {
        updated.name = hobby.name;
      }
      if(hobby.passionLevel) {
        updated.passionLevel = hobby.passionLevel;
      }
      if(hobby.year) {
        updated.year = hobby.year;
      }      return this.hobbyTransformer.fromEntityToDTO(updated);
    } catch (error) {
      throw error;
    }
  }

  // Delete one hobby with soft delete
  public async deleteOneHobby(
    id: string,
  ): Promise<HobbyDTO>{
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      return this.hobbyTransformer.fromEntityToDTO(deleted);
    } catch (error) {
      throw error;
    }
  }
  
  // List hobbies
  public async listHobbiesByUser(
    userId: string
  ): Promise<Array<HobbyDTO>>{
    try {
      const listed = await this.model.find({
        user: Types.ObjectId(userId),
        deletedAt: null
      });
      return listed.map(l => { return this.hobbyTransformer.fromEntityToDTO(l) })
    } catch (error) {
      throw error;
    }
  }

  // Delete one hobby with soft delete
  public async deleteHobbiesByUser(
    userId: string,
    session: ClientSession
  ){
    try {
      const deleted = await this.model.deleteMany(
        {
          user: Types.ObjectId(userId)
        }, {
          session
        }
      )
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
