/* eslint-disable prettier/prettier */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {Note} from 'src/note/Note';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [Note], {nullable: true})
  notes: Note[]
}
