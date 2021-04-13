/* eslint-disable prettier/prettier */
import {BadRequestException, UseGuards} from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {AuthGuard} from '@nestjs/passport';
import {LoginInput} from './Dto/loginInput';
import {UserInput} from './Dto/userInput';
import {User} from './User';
import {CurrentUser} from './user.decorator';
import {GqlAuthGuard} from './user.guard';
import {UserService} from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly service: UserService) {}

    @Mutation(() => User)
    register(@Args('input') input: UserInput) {
        return this.service.register(input)
    }

    @Query(() => String)
    login(@Args('input') input: LoginInput) {
        return this.service.login(input)
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    user(@CurrentUser() user: User) {
        return this.service.userById(user.id)
    }

    @Query(() => [User])
    @UseGuards(GqlAuthGuard)
    async Users(@CurrentUser() user: User) 
    {   const us = await this.service.userById(user.id)
        if(us.role === 'USER') throw new BadRequestException('Permission Denied')
        return await this.service.Users()
    }

    @Query(() => String)
    @UseGuards(GqlAuthGuard)
    deleteUser(@Args('id') id: number) {
        return this.service.deleteUser(id)
    }

}
