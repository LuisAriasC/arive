import { Test } from '@nestjs/testing';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';
import { HobbyInputDTO } from 'src/modules/hobbies/dto/hobby-input.dto';
import { HobbyUpdateDTO } from 'src/modules/hobbies/dto/hobby-update.dto';
import { HobbyEntity, HobbySchema } from 'src/modules/hobbies/entity/hobby.entity';
import { HobbyResolver } from 'src/modules/hobbies/hobby.resolver';
import { HobbyService } from 'src/modules/hobbies/hobby.service';
import { HobbyTransformer } from 'src/modules/hobbies/hobby.transformer';
import { HobbyController } from 'src/modules/hobbies/hobby.controller';
import { UserModule } from 'src/modules/users/user.module';
import { DatabaseModule } from '../database/database.module';

describe('HobbyController', () => {
  let hobbyController: HobbyController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HobbyResolver, HobbyService, HobbyController, HobbyTransformer],
      controllers: [HobbyController],
      imports: [
        NestjsQueryGraphQLModule.forFeature({
          imports: [
            NestjsQueryMongooseModule.forFeature([
              {
                document: HobbyEntity,
                name: HobbyEntity.name,
                schema: HobbySchema,
              },
            ]),
            UserModule,
            DatabaseModule,
          ],
          services: [HobbyService, HobbyTransformer],
          resolvers: [
            {
              DTOClass: HobbyDTO,
              EntityClass: HobbyEntity,
              CreateDTOClass: HobbyInputDTO,
              UpdateDTOClass: HobbyUpdateDTO,
              enableAggregate: true,
              enableTotalCount: true,
              enableSubscriptions: false,
              create: { many: { disabled: true } },
              update: { many: { disabled: true } },
              delete: { disabled: true },
            },
          ],
        }),
        UserModule,
        DatabaseModule,
      ],
      exports: [HobbyService],
    }).compile();

    hobbyController = moduleRef.get<HobbyController>(HobbyController);
  });

  it('Controller should be defined', () => {
    expect(hobbyController).toBeDefined();
  });
});
