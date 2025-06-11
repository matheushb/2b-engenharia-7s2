import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Task } from '../entity/task.entity';
import { Meta } from '@/interfaces/meta.interface';
import { FindAllResponse } from '@/interfaces/find-all-response.interface';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { TASK_SELECT, TaskSelect } from '../enums/task-select.enum';
import { Transform } from 'class-transformer';
import { SelectSanatizer } from '@/common/select/select-sanitizer.transformer';

export class TaskFilterParams extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiPropertyOptional({
    enum: TASK_SELECT,
    enumName: 'TaskSelect',
    isArray: true,
  })
  @IsOptional()
  @IsEnum(TASK_SELECT, { each: true })
  @Transform(SelectSanatizer)
  select?: TaskSelect[];
}

export class FindAllTaskResponse implements FindAllResponse<Task> {
  @ApiProperty({ type: [Task] })
  data: Task[];

  @ApiProperty()
  meta: Meta;
} 