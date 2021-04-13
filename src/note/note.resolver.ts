/* eslint-disable prettier/prettier */
import {UseGuards} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {User} from 'src/user/User';
import {CurrentUser} from 'src/user/user.decorator';
import {GqlAuthGuard} from 'src/user/user.guard';
import {NoteInput} from './Dto/noteInput';
import {Note} from './Note';
import {NoteService} from './note.service';

@Resolver()
export class NoteResolver {
    constructor(private readonly service: NoteService) {}

    @Query(() => [Note])
    allPosts() {
        return this.service.Notes()
    }
    
    @Query(() => [Note])
    @UseGuards(GqlAuthGuard)
    posts(@CurrentUser() user: User) {
        return this.service.NotesByUser(user.id)
    }

    @Query(() => Note)
    @UseGuards(GqlAuthGuard)
    post(@Args('id') id: number) {
        return this.service.Note(id)
    }

    @Mutation(() => Note)
    @UseGuards(GqlAuthGuard)
    addPost(@Args('input') input: NoteInput, @CurrentUser() user: User) {
        return this.service.addNote(user.id, input)
    }

    @Query(() => String)
    @UseGuards(GqlAuthGuard)
    deletePost(@Args('id') id: number) {
        return this.service.deleteNote(id)
    }
}
