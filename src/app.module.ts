import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}