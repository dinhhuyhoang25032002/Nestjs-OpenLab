import { Body, Controller, Post } from '@nestjs/common';
import { LessonClass } from 'src/lessons/class/Lesson.class';
import { LessonsService } from 'src/lessons/lessons.service';

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonService: LessonsService) { }

    @Post('create-a-lesson')
    async createALesson(@Body() content: LessonClass) {
        return this.lessonService.handleCreateLesson(content)
    }
}
