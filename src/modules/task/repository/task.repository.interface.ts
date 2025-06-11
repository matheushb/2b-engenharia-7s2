import { Repository } from '@/interfaces/repository.interface';
import { Task } from '../entity/task.entity';
import { TaskFilterParams } from '../dtos/find-all-task.dto';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface TaskRepositoryInterface extends Repository<Task, TaskFilterParams> {
  findByUserId(userId: string): Promise<Task[]>;
}
