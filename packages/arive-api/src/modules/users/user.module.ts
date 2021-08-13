import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { UserInputDTO } from 'src/modules/users/dto/user-input.dto';
import { UserUpdateDTO } from 'src/modules/users/dto/user-update.dto';
import { UserEntity, UserSchema } from 'src/modules/users/entity/user.entity';
import { UserResolver } from 'src/modules/users/user.resolver';
import { UserService } from 'src/modules/users/user.service';
import { UserTransformer } from 'src/modules/users/user.transformer';
import { UserController } from 'src/modules/users/user.controller';
import { HobbyModule } from 'src/modules/hobbies/hobby.module';

@Module({
  providers: [UserResolver, UserService, UserController],
  controllers: [UserController],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: UserEntity,
            name: UserEntity.name,
            schema: UserSchema,
          },
        ]),
        HobbyModule
      ],
      services: [UserService, UserTransformer],
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: UserEntity,
          CreateDTOClass: UserInputDTO,
          UpdateDTOClass: UserUpdateDTO,
          enableAggregate: true,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
