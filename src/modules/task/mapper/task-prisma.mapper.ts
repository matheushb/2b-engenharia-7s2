import { Injectable } from '@nestjs/common';
import { Task as PrismaTask } from '@prisma/client';
import { SelectableTask, Task } from '../entity/task.entity';
import { TaskMapper } from './task.mapper';

@Injectable()
export class TaskPrismaMapper implements TaskMapper<PrismaTask> {
  mapToEntity(externalTask: PrismaTask): Task {
    return {
      id: externalTask.id,
      title: externalTask.title,
      description: externalTask.description ?? undefined,
      completed: externalTask.completed,
      user_id: externalTask.user_id,
      created_at: externalTask.created_at,
      updated_at: externalTask.updated_at,
    };
  }

  mapFromEntity(task: Task): PrismaTask {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? null,
      completed: task.completed,
      user_id: task.user_id,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  }

  mapToSelectableEntity(task: Partial<PrismaTask>): SelectableTask {
    return {
      ...(task.id && { id: task.id }),
      ...(task.title && { title: task.title }),
      ...(task.description !== undefined && {
        description: task.description ?? undefined,
      }),
      ...(task.completed !== undefined && { completed: task.completed }),
      ...(task.user_id && { user_id: task.user_id }),
      ...(task.created_at && { created_at: task.created_at }),
      ...(task.updated_at && { updated_at: task.updated_at }),
    };
  }
}
