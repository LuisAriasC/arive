import { Injectable, Scope, Logger } from '@nestjs/common';
import { HobbyEntity } from 'src/modules/hobbies/entity/hobby.entity';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';

@Injectable({ scope: Scope.REQUEST })
export class HobbyTransformer {
  private readonly logger = new Logger(HobbyTransformer.name);

  constructor() {}

  public fromEntityToDTO(hobbyEntity: HobbyEntity): HobbyDTO {
    const hobbyDTO: HobbyDTO = {
      id: hobbyEntity.id,
      name: hobbyEntity.name,
      passionLevel: hobbyEntity.passionLevel,
      year: hobbyEntity.year,
      createdAt: hobbyEntity.createdAt,
      updatedAt: hobbyEntity.updatedAt,
    };
    return hobbyDTO;
  }
}
