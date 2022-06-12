import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Character extends Document {
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
