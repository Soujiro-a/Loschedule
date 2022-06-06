import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', function (next) {
            const user = this;
            if (user.password) {
              bcrypt.genSalt((err, salt) => {
                if (err) return next(err);

                bcrypt.hash(user.password, salt, (err, hash) => {
                  if (err) return next(err);

                  user.salt = salt;
                  user.password = hash;
                  next();
                });
              });
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
