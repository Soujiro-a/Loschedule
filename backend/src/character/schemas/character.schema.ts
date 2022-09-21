import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema({
  timestamps: true,
})
export class Character {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsNumber()
  level: number;

  @Prop({ required: true })
  @IsString()
  job: string;

  @Prop({ required: true })
  @IsString()
  server: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
