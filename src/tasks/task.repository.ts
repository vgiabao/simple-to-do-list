import { Entity, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title, description, status: TaskStatus.OPEN
    });
    await this.save(task);
    return task;
  }

  async getTaskById(id: string) {
    const task = await this.findOne({ id });
    if (!task) throw new NotFoundException();
    return task;
  }

  async deleteTask(id: string) {
    const result = await this.delete(id);
    if (result.affected === 0) throw new NotFoundException();
    return "Deleted " + id + " successfully!";
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.findOne({ id });
    task.status = status;
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    console.log(status);
    const query = this.createQueryBuilder("task");
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere("LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search", { search: `%${search.toLowerCase()}%` });
    }
    const tasks = await query.getMany();
    return tasks;

  }
}
