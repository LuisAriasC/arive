import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { FilterableField, KeySet, PagingStrategies, QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { PassionLevelType } from 'src/common/enums/passion-level.type';
import { PassionLevelEnum } from 'src/common/enums/passion-level.enum';

@ObjectType('Hobby')
@KeySet(['id'])
@Relation('user', () => UserDTO, {
  disableRemove: true,
  nullable: true,
})
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
export class HobbyDTO {
  @ApiProperty({
    nullable: false,
    example: '61155ad1fa94427444ed8fa7',
    type: String,
    description: `Hobby's id`,
  })
  @FilterableField(() => ID)
  id!: string;

  @ApiProperty({
    nullable: false,
    example: 'Football',
    type: String,
    description: `Hobby's name`,
  })
  @FilterableField(() => String)
  name!: string;

  @ApiProperty({
    nullable: false,
    example: 'Low',
    enum: PassionLevelEnum,
    description: `Hobby's passion level`,
  })
  @FilterableField(() => String)
  passionLevel!: PassionLevelType;

  @ApiProperty({
    nullable: false,
    example: 2015,
    type: Number,
    minimum: 0,
    description: `Hobby's started from given year`,
  })
  @FilterableField(() => Number)
  year!: number;

  @ApiProperty({
    nullable: false,
    type: Date,
    description: 'Date of hobby creation',
  })
  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @ApiProperty({
    nullable: false,
    type: Date,
    description: 'Date of hobby update',
  })
  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;
}
