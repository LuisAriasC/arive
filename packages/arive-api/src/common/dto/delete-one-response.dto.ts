/* Nestjs Dependencies */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('DeleteOneResponse')
export class DeleteOneResponseDTO {
  @Field(() => String)
  status!: string;
}
