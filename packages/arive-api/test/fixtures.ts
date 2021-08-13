/* eslint-disable no-underscore-dangle,@typescript-eslint/no-unsafe-assignment */
import { Connection, Types } from 'mongoose';
import { UserEntity } from '../src/modules/users/entity/user.entity';
import { HobbyEntity } from '../src/modules/hobbies/entity/hobby.entity';
import { asyncLoop } from './db-test.helpers';

const { ObjectId } = Types;
const date = new Date();

export const USERS = [
    {
        id: "6115d3ab1b3d2769aa8ca1ab",
        name: 'First Test User',
        createdAt: date,
        updatedAt: date,
    },
];

export const HOBBIES = [
    {
        id: '6115d3ab1b3d2769aa8ca1bb',
        name: 'First Hobby',
        passionLevel: 'Medium',
        year: 2020,
        user: USERS[0].id,
        createdAt: date,
        updatedAt: date
    },
    {
        id: '6115d3ab1b3d2769aa8ca1bc',
        name: 'Second Hobby',
        passionLevel: 'Medium',
        year: 2020,
        user: USERS[0].id,
        createdAt: date,
        updatedAt: date
    },
    {
        id: '6115d3ab1b3d2769aa8ca1bd',
        name: 'Third Hobby',
        passionLevel: 'Medium',
        year: 2020,
        user: USERS[0].id,
        createdAt: date,
        updatedAt: date
    }
];

const documents = [UserEntity.name, HobbyEntity.name];
export const truncate = async (connection: Connection): Promise<void> =>
  asyncLoop(documents, (document) => connection.model(document).remove({}).exec());

export const refresh = async (connection: Connection): Promise<void> => {
  await truncate(connection);

  const UserModel = connection.model<UserEntity>(UserEntity.name);
  const HobbyModel = connection.model<HobbyEntity>(HobbyEntity.name);

  const users = await Promise.all(USERS.map(({id, ...data}) => new UserModel({_id: Types.ObjectId(id).toHexString(),...data}).save()));
  await Promise.all(HOBBIES.map(({id, ...data }) => new HobbyModel({_id: Types.ObjectId(id).toHexString(), ...data}).save()));
};