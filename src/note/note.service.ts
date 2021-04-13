/* eslint-disable prettier/prettier */
import {PrismaClient} from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import {NoteInput} from './Dto/noteInput';

@Injectable()
export class NoteService extends PrismaClient {

    async Notes():Promise<any> {
        const notes = await this.note.findMany()
        return notes
    }

    async NotesByUser(id: number):Promise<any> {
        const notes = await this.note.findMany({ where: {userId: id} })
        return notes
    }

    async Note(id: number):Promise<any> {
        const note = await this.note.findUnique({ where: {id: id} })
        if(!note) throw new NotFoundException('Cette Note Intouvable')
        return note
    }

    async addNote(id: number, input: NoteInput):Promise<any> {
        const {title, content} = input
        const nvNote = await this.note.create({
            data: {title, content, userId: id}
        })
        return nvNote
    }

    async deleteNote(id: number) {
        const note = await this.note.findUnique({ where: {id: id} })
        if(!note) throw new NotFoundException('Cette Note Intouvable')
        await this.note.delete({ where: {id: id} })
        return 'Note Deleted'
    }
}
