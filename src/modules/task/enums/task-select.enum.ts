import { ObjectValues } from '@/common/types/object-keys.types';

export const TASK_SELECT = {
  ID: 'id',
  TITLE: 'title',
  DESCRIPTION: 'description',
  COMPLETED: 'completed',
  USER_ID: 'user_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

export type TaskSelect = ObjectValues<typeof TASK_SELECT>; 