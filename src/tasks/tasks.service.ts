import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { stat } from "fs";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository)
              private taskRepository: TaskRepository) {
  }

  getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto, user);
  }

  deleteTask(id:string) : Promise<string>{
    return this.taskRepository.deleteTask(id)
  }
  updateTaskStatus(id:string, status:TaskStatus):Promise<Task>{
    return this.taskRepository.updateTaskStatus(id, status)
  }
  // getTaskWithFilter(filterDto: GetTaskFilterDto): Task[]{
  //   const {search, status} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status){
  //     tasks= tasks.filter(task => task.status == status)
  //   }
  //   if (search){
  //     tasks = tasks.filter(task => {
  //       if (task.title.includes(search) || task.description.includes(search)) return true
  //     })
  //   }
  //   return tasks
  // }
}
