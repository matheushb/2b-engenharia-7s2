import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskRepositoryInterface } from './repository/task.repository.interface';
import { Task } from './entity/task.entity';
import { TaskFilterParams } from './dtos/find-all-task.dto';
import { TASK_REPOSITORY } from './repository/task.repository.interface';
import { RequestUser } from '@/common/decorators/user/user-from-request.decorator';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepositoryInterface,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: RequestUser): Promise<Task> {
    const task = new Task({
      title: createTaskDto.title,
      description: createTaskDto.description,
      user_id: createTaskDto.user_id || user.id,
      completed: createTaskDto.completed || false,
    });

    console.log(task);
    return this.taskRepository.create(task);
  }

  async findAll(params: TaskFilterParams) {
    return this.taskRepository.findAll(params);
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user_id !== userId) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);
    const updatedTask = new Task({ ...task, ...updateTaskDto });
    return this.taskRepository.update(updatedTask);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.taskRepository.delete(id);
  }
}
