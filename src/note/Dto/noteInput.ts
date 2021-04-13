/* eslint-disable prettier/prettier */
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class NoteInput {
    @Field(() => String)
    title: string

    @Field(() => String)
    content: string
}