import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeCreateMany, BeforeCreateOne, CreateManyInputType, CreateOneInputType } from '@nestjs-query/query-graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@InputType('UserInput')
@BeforeCreateOne((input: CreateOneInputType<UserDTO>, context: any) => {
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<UserDTO>, context: any) => {
    input.input = input.input.map((c) => ({ ...c }));
    return input;
  },
)
export class UserInputDTO {
  // Validate name lenght and type
  @ApiProperty({
    nullable: false,
    example: 'Luis Arias',
    type: String,
    description: 'User Name',
    minLength: 4,
    maxLength: 50,
    required: true
  })
  @Field(() => String)
  @MinLength(4)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name!: string;
}
