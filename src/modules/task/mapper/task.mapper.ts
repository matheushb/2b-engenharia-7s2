import { Mapper } from '@/common/mapper/mapper';
import { SelectableTask, Task } from '../entity/task.entity';

export const TASK_MAPPER = 'TASK_MAPPER';

export interface TaskMapper<E> extends Mapper<Task, E> {
  mapToSelectableEntity(selectable: Partial<E>): SelectableTask;
}
