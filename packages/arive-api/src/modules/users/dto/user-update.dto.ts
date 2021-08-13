import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeUpdateMany, BeforeUpdateOne, UpdateManyInputType, UpdateOneInputType } from '@nestjs-query/query-graphql';
import { IsOptional, IsString, IsNotEmpty, MinLength, MaxLength, IsDate } from 'class-validator';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@InputType('UserUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<UserDTO>, context: any) => {
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<UserDTO, UserDTO>, context: any) => {
    return input;
  },
)
export class UserUpdateDTO {
  // Validate lenght and type for name
  @ApiProperty({
    nullable: false,
    example: 'Luis Arias',
    type: String,
    description: 'User Name',
    minLength: 4,
    maxLength: 50,
    required: false
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
