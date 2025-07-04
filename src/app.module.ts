import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { EnvConfigModule } from './common/environment/environment/env-config/env-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    EnvConfigModule,
    AuthModule,
    UserModule,
    TaskModule,
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
