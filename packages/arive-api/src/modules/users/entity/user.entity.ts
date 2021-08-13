import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema({
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
})
export class UserEntity extends Document {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}
export const UserSchema = SchemaFactory.createForClass(UserEntity);
UserSchema.virtual('hobbies', {
  ref: 'HobbyEntity',
  localField: '_id',
  foreignField: 'user',
});
