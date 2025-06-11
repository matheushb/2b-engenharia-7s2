import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { paginateMeta, paginationParamsToPrismaParams } from '@/common/pagination/paginate-params';
import { TaskRepositoryInterface } from './task.repository.interface';
import { Task } from '../entity/task.entity';
import { TaskFilterParams } from '../dtos/find-all-task.dto';
import { TaskSelect } from '../enums/task-select.enum';
import { TaskPrismaMapper } from '../mapper/task-prisma.mapper';

const TASK_SELECT_FIELDS: Prisma.TaskSelect = {
  id: true,
  title: true,
  description: true,
  completed: true,
  user_id: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class TaskPrismaRepository implements TaskRepositoryInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskMapper: TaskPrismaMapper,
  ) {}

  async create(task: Task) {
    console.log(this.taskMapper.mapFromEntity(task));
    const createdTask = await this.prismaService.task.create({
      data: this.taskMapper.mapFromEntity(task),
      select: TASK_SELECT_FIELDS,
    });

    return this.taskMapper.mapToEntity(createdTask);
  }

  async findAll(params: TaskFilterParams) {
    const pagination = paginationParamsToPrismaParams(params);
    const where = this.getWhereClause(params);
    const select = params.select ? this.getSelectFields(params) : TASK_SELECT_FIELDS;

    const [tasks, meta] = await Promise.all([
      this.prismaService.task.findMany({
        ...pagination,
        select,
        where,
      }),
      paginateMeta(await this.prismaService.task.count({ where }), pagination),
    ]);

    return {
      data: tasks.map(this.taskMapper.mapToSelectableEntity),
      meta,
    };
  }

  async findOne(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      select: TASK_SELECT_FIELDS,
    });

    if (!task) return null;

    return this.taskMapper.mapToEntity(task);
  }

  async update(task: Task) {
    const updatedTask = await this.prismaService.task.update({
      where: { id: task.id },
      data: this.taskMapper.mapFromEntity(task),
      select: TASK_SELECT_FIELDS,
    });

    return this.taskMapper.mapToEntity(updatedTask);
  }

  async delete(id: string) {
    const task = await this.prismaService.task.delete({
      where: { id },
      select: TASK_SELECT_FIELDS,
    });

    if (!task) return null;

    return this.taskMapper.mapToEntity(task);
  }

  async findByUserId(userId: string) {
    const tasks = await this.prismaService.task.findMany({
      where: { user_id: userId },
      select: TASK_SELECT_FIELDS,
    });

    return tasks.map(this.taskMapper.mapToEntity);
  }

  private getSelectFields(params: TaskFilterParams): Prisma.TaskSelect {
    return params.select.reduce((acc: Prisma.TaskSelect, field: TaskSelect) => {
      acc[field] = true;
      return acc;
    }, {});
  }

  private getWhereClause(params: TaskFilterParams): Prisma.TaskWhereInput {
    return {
      ...(params.title && {
        title: { contains: params.title, mode: 'insensitive' },
      }),
      ...(params.completed !== undefined && {
        completed: params.completed,
      }),
      ...(params.user_id && {
        user_id: params.user_id,
      }),
    };
  }
}
