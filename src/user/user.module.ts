/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: "reallyfuckinghard",
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [UserService, UserResolver, JwtStrategy]
})
export class UserModule {}
