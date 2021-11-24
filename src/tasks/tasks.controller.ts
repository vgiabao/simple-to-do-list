import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @UseGuards(AuthGuard())
  @Get('')
  getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User) : Promise<Task[]>{
      return this.tasksService.getAllTasks(filterDto, user)
  }
  @Post("create")
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user) {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string, @GetUser() user): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<string> {
    return this.tasksService.deleteTask(id);
  }


  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

}
