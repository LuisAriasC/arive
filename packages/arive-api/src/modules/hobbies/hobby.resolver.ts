import { Resolver } from '@nestjs/graphql';
import { HobbyDTO } from 'src/modules/hobbies/dto/hobby.dto';
import { HobbyService } from 'src/modules/hobbies/hobby.service';

@Resolver(() => HobbyDTO)
export class HobbyResolver {
  constructor(readonly service: HobbyService) {}
}
