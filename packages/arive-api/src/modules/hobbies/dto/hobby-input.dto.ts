import { Field, ID, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeCreateMany, BeforeCreateOne, CreateManyInputType, CreateOneInputType } from '@nestjs-query/query-graphql';
import { IsString, IsNotEmpty, IsEnum, IsIn, IsNumber } from 'class-validator';
import { nanoid } from 'nanoid';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';
import { PassionLevelEnum } from 'src/common/enums/passion-level.enum';
import { PassionLevelType } from 'src/common/enums/passion-level.type';
import { PassionLevels } from 'src/common/enums/passion-levels';

@InputType('HobbyInput')
@BeforeCreateOne((input: CreateOneInputType<HobbyDTO>, context: any) => {
  input.input.id = nanoid(24);
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<HobbyDTO>, context: any) => {
    input.input = input.input.map((c) => {
      const id = nanoid(24);
      return {
        ...c,
        id,
      };
    });
    return input;
  },
)
export class HobbyInputDTO {
  @ApiProperty({
    nullable: false,
    example: 'Futball',
    type: String,
    description: 'Hobby Name',
    required: true
  })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    nullable: false,
    example: 'Low',
    type: String,
    enum: PassionLevelEnum,
    description: 'Hobby passion level',
    required: true
  })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEnum(PassionLevels)
  passionLevel!: PassionLevelType;

  @ApiProperty({
    nullable: false,
    example: 2015,
    type: Number,
    description: 'Hobby year of start',
    required: true
  })
  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  year!: number;

  @ApiProperty({
    nullable: false,
    example: '61155ad1fa94427444ed8fa7',
    type: String,
    description: 'Hobbys user',
    required: true
  })
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  user!: string;
}
