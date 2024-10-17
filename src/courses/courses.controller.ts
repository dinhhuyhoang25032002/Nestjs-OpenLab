import { Body, Controller, Get, Param, Patch, Post, Delete, Query, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '@schemas/course.schema';
import { CourseClass, UpdateCourse } from './class/Course.class';
@Controller('courses')
export class CoursesController {

    constructor(private readonly courseService: CoursesService) { }

    //GET /courses/search/?name || ? price
    @Get('search')
    findCourseByName(@Query('name') name?: string, @Query('price') price?: string) {
        return this.courseService.getCoursesBySearch(name, price);
    }
    //GET /courses/active/
    @Post('active')
    findAllCourseActive(@Body() body: { userId: string, courseId?: Array<string> }) {
        return this.courseService.getAllCourseActive(body)
    }
    //GET /course/get-name
    @Get('get-name')
    getNameCourses(@Query('name') name: string) {
        return this.courseService.getCourseByName(name);
    }

    //GET /courses/:id
    @Get(':id')
    findOneCourse(@Param('id') id: string) {
        return this.courseService.findOneCourse(id);
    }

    //GET /courses?id
    @Get()
    findAll(@Query('id') id: string) {
        console.log(id);
        return this.courseService.findOneCourse(id);
    }

    //POST /courses
    @Post()
    async create(@Body() Course: CourseClass) {
        //  console.log('check course needed create', Course);
        return this.courseService.createOneCourse(Course);
    }

    //PUT /courses/:id 
    @Put(':id')
    async update(@Param('id') id: string, @Body() Course: CourseClass) {
        return this.courseService.updateOneCourse(id, Course);
    }

    //PATCH /courses/:id
    @Patch(':id')
    async updateInFor(@Param('id') id: string, @Body() CourseInfo: UpdateCourse): Promise<string> {
        return this.courseService.updateInForCourse(id, CourseInfo);
    }

    //DELETE /courses/soft-delete/?id
    @Delete('soft-delete')
    async softDelete(@Query('id') id: string): Promise<string> {
        return this.courseService.deleteOneCourse(id);
    }

    //PATCH /courses/restore/?id
    @Patch('restore')
    async restoreCourse(@Query('id') id: string) {
        return this.courseService.restoreCourse(id);
    }

    //DELETE /courses/:id
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
        return this.courseService.hardDeleteCourse(id);
    }

}
