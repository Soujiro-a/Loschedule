import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import moment from 'moment-timezone';
import { Character } from 'src/character/schemas/character.schema';

@Schema()
export class Raid extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  leader: ObjectId;

  @Prop({ required: true })
  @IsString()
  bossName: string;

  @Transform(({ value }) =>
    moment(value).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm'),
  )
  @Prop({ required: true })
  @IsString()
  targetDate: string;

  @Prop([
    {
      _id: { type: SchemaTypes.ObjectId, ref: 'Character' },
      name: { type: String, required: true },
      level: { type: Number, required: true },
      job: { type: String, required: true },
      server: { type: String, required: true },
    },
  ])
  characters?: Character[];
}

export const RaidSchema = SchemaFactory.createForClass(Raid);
