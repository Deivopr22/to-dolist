import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.findOne(id); // Valida que exista antes de actualizar
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Valida que exista
    return this.prisma.todo.delete({ where: { id } });
  }
}