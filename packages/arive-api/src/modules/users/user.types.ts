import { ArgsType, InputType } from '@nestjs/graphql';
import {
  DeleteManyInputType,
  MutationArgsType,
} from '@nestjs-query/query-graphql';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@InputType()
class DeleteManyUsersInput extends DeleteManyInputType(UserDTO) {}

@ArgsType()
export class DeleteManyUsersArgs extends MutationArgsType(
  DeleteManyUsersInput,
) {}
