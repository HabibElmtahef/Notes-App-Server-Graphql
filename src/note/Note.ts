/* eslint-disable prettier/prettier */
import {Field, ID, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Note {
    @Field(() => ID)
    id: number

    @Field(() => String)
    title:string

    @Field(() => String)
    content: string

    @Field(() => String)
    createdAt: string

    @Field(() => Int)
    userId: number
}