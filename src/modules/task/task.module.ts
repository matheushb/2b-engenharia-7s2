import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { TaskPrismaMapper } from './mapper/task-prisma.mapper';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { TASK_MAPPER } from './mapper/task.mapper';
import { TASK_REPOSITORY } from './repository/task.repository.interface';
import { TaskPrismaRepository } from './repository/task-prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [
    {
      provide: TASK_MAPPER,
      useFactory: () => {
        return new TaskPrismaMapper();
      },
    },
    {
      provide: TASK_REPOSITORY,
      useFactory: (prismaService: PrismaService, mapper: TaskPrismaMapper) => {
        return new TaskPrismaRepository(prismaService, mapper);
      },
      inject: [PrismaService, TASK_MAPPER],
    },
    TaskService,
  ],
  exports: [TaskService],
})
export class TaskModule {}
