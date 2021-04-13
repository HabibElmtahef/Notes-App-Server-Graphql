/* eslint-disable prettier/prettier */
import { PrismaClient } from '.prisma/client';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserInput } from './Dto/userInput';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {LoginInput} from './Dto/loginInput';

@Injectable()
export class UserService extends PrismaClient {
  constructor(private jwtServie: JwtService) {
    super();
  }

  async register(input: UserInput) {
    const { username, email, password } = input;
    if(!username || !email || !password) throw new BadRequestException('Please Complete All Fields')
    const user = await this.user.findFirst({
      where: { email: email },
    });
    if (user) throw new BadRequestException('Nah This User Already Exist')
    const hashPassword = await bcrypt.hash(password, 10)
      const nvUser = await this.user.create({
        data: { username, email, password: hashPassword },
      });
    return nvUser;
  }

 async login(input: LoginInput) {
   const {email, password} = input
   if(!email || !password) throw new BadRequestException('Please Complete All Fields')
   const user = await this.user.findFirst({ where: {email: email} })
   if(!user) throw new NotFoundException('Email or Password Not Valid')
   const correctPassword = await bcrypt.compare(password, user.password)
   if(!correctPassword) throw new NotFoundException('Email or Password Not Valid')
   const token = await this.jwtServie.signAsync({id: user.id, email: user.email})
   return token
 }

 async userById(id: number):Promise<any> {
   const user = await this.user.findUnique({ where: {id: id}, include: {notes: true} })
   if(!user) throw new UnauthorizedException('Auth pas Valid')
   return user
 }  

 async Users() {
   const users  = await this.user.findMany()
   return users
 }

 async deleteUser(id: number):Promise<any> {
   const user = await this.user.findUnique({ where: {id: id} })
   if(!user) throw new NotFoundException('Cette User n exist pas')
   await this.user.delete({ where: {id: id} })
   return "User Deleted"
 }

}
