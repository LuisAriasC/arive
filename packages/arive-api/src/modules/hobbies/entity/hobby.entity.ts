import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { nanoid } from 'nanoid';
import { PassionLevelType } from 'src/common/enums/passion-level.type';
import { PassionLevels } from 'src/common/enums/passion-levels';
import { UserEntity } from 'src/modules/users/entity/user.entity';

@Schema({
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
})
export class HobbyEntity extends Document {
  @Prop({
    required: true,
    type: 'string',
  })
  name!: string;

  @Prop({
    required: true,
    type: 'string',
    enum: PassionLevels
  })
  passionLevel!: PassionLevelType;

  @Prop({
    required: true,
    type: 'number',
  })
  year!: number;

  @Prop({ 
    type: SchemaTypes.ObjectId, 
    ref: 'UserEntity', 
    required: true,
  })
  user!: Types.ObjectId;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const HobbySchema = SchemaFactory.createForClass(HobbyEntity);
