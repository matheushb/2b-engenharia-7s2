import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EntityProps } from '@/common/types/entity-props.types';

export class Task {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  id: string;

  @ApiProperty({ example: 'Complete project documentation' })
  title: string;

  @ApiProperty({ example: 'Write comprehensive documentation for the API endpoints', required: false })
  description?: string;

  @ApiProperty({ example: false })
  completed: boolean;

  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  user_id: string;

  @ApiProperty({ example: new Date() })
  created_at: Date;

  @ApiProperty({ example: new Date() })
  updated_at: Date;

  constructor(task: EntityProps<typeof Task>) {
    this.id = task.id ?? crypto.randomUUID();
    this.title = task.title;
    this.description = task.description;
    this.completed = task.completed ?? false;
    this.user_id = task.user_id;
    this.created_at = task.created_at ?? new Date();
    this.updated_at = task.updated_at ?? new Date();
  }
}

export class SelectableTask extends PartialType(Task) {}
