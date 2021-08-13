import { Field, ID, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum, IsNumber, IsDate } from 'class-validator';
import { BeforeUpdateMany, BeforeUpdateOne, UpdateManyInputType, UpdateOneInputType } from '@nestjs-query/query-graphql';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';
import { PassionLevelType } from 'src/common/enums/passion-level.type';
import { PassionLevels } from 'src/common/enums/passion-levels';
import { PassionLevelEnum } from 'src/common/enums/passion-level.enum';

@InputType('HobbyUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<HobbyDTO>, context: any) => {
  // eslint-disable-next-line no-param-reassign
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<HobbyDTO, HobbyDTO>, context: any) => {
    return input;
  },
)
export class HobbyUpdateDTO {
  @ApiProperty({
    nullable: false,
    example: 'Futball',
    type: String,
    description: 'Hobby Name',
    required: false
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    nullable: false,
    example: 'Low',
    type: String,
    enum: PassionLevelEnum,
    description: 'Hobby passion level',
    required: false
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PassionLevels)
  passionLevel?: PassionLevelType;

  @ApiProperty({
    nullable: false,
    example: 2015,
    type: Number,
    description: 'Hobby year of start',
    required: false
  })
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  year?: number;

  @ApiProperty({
    nullable: false,
    example: '61155ad1fa94427444ed8fa7',
    type: String,
    description: 'Hobbys user',
    required: false
  })
  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  user?: string;
}
