import { DeleteOneInputType } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserDTO } from 'src/modules/users/dto/user.dto';
import { UserService } from 'src/modules/users/user.service';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(readonly service: UserService) {}

  @Mutation(() => UserDTO, { nullable: true })
  async deleteOneUser(
    @Args('input', { type: () => DeleteOneInputType() })
    input: DeleteOneInputType,
  ): Promise<UserDTO> {
    return await this.service.deleteOneUser(String(input.id));
  }
}
