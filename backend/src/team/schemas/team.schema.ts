import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  leader: ObjectId;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'User' }])
  members?: ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Team' }])
  raids?: ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
