import { ApiBadRequestExceptionReponse } from '@/common/decorators/exceptions/bad-request-response.decorator';
import { ApiForbiddenExceptionReponse } from '@/common/decorators/exceptions/forbidden-response.decorator';
import { ApiNotFoundExceptionReponse } from '@/common/decorators/exceptions/not-found-response.decorator';
import { ApiUnauthorizedExceptionReponse } from '@/common/decorators/exceptions/unauthorized-response.decorator';
import { RequestUser, UserFromRequest } from '@/common/decorators/user/user-from-request.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FindAllTaskResponse, TaskFilterParams } from './dtos/find-all-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { Roles } from '@/common/decorators/roles/roles.decorator';
import { Role } from '../user/enums/role.enum';

const route = '/tasks';
const routeId = '/tasks/:id';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller({ path: route, version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('USER', 'ADMIN')
@ApiUnauthorizedExceptionReponse(route)
@ApiForbiddenExceptionReponse(route)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: Task })
  @ApiBadRequestExceptionReponse(route)
  async create(@Body() createTaskDto: CreateTaskDto, @UserFromRequest() user: RequestUser) {
    console.log(user);
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  @ApiOkResponse({ type: FindAllTaskResponse })
  @ApiBadRequestExceptionReponse(route)
  async findAll(@Query() params: TaskFilterParams, @UserFromRequest() user: RequestUser) {
    return this.taskService.findAll({
      ...params,
      user_id: user.role === Role.ADMIN ? params.user_id : user.id,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiBadRequestExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Task')
  async findOne(@Param('id') id: string, @UserFromRequest() user: RequestUser) {
    return this.taskService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiBadRequestExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Task')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @UserFromRequest() user: RequestUser) {
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Task')
  async delete(@Param('id') id: string, @UserFromRequest() user: RequestUser) {
    await this.taskService.delete(id, user.id);
  }
}
