import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CursorConnection, FilterableField, KeySet, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';

@ObjectType('User')
@CursorConnection('hobbies', () => HobbyDTO, {
  nullable: true,
  pagingStrategy: PagingStrategies.OFFSET,
  enableAggregate: true,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
export class UserDTO {
  @ApiProperty({
    nullable: false,
    example: '61155ad1fa94427444ed8fa7',
    type: String,
    description: 'User id',
  })
  @FilterableField(() => ID)
  id!: string;

  @ApiProperty({
    nullable: false,
    example: 'Luis Arias',
    type: String,
    description: 'User name',
  })
  @FilterableField(() => String)
  name!: string;

  @ApiProperty({
    nullable: false,
    type: Date,
    description: 'Date of users creation',
  })
  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @ApiProperty({
    nullable: false,
    type: Date,
    description: 'Date of last users update',
  })
  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;
}
