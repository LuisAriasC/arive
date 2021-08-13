import { Injectable, Scope, Logger } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserTransformer {
  private readonly logger = new Logger(UserTransformer.name);

  constructor() {}

  public fromEntityToDTO(userEntity: UserEntity): UserDTO {
    const userDTO: UserDTO = {
      id: userEntity.id,
      name: userEntity.name,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
    return userDTO;
  }
}
