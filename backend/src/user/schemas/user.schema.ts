import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
import bcrypt from 'bcrypt';

export const UserRole = ['user', 'admin'] as const;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  @IsString()
  nickname: string;

  @Prop({})
  @IsString()
  salt?: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true, default: 'user', enum: UserRole })
  @IsString()
  role: string;

  comparePassword: (plainPassword: string) => Promise<boolean>;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Character' }])
  characters?: ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Team' }])
  teams?: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  plainPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};
