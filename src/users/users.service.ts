import { Prisma, User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    await this.findOne(id);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.hashed.delete({
      where: {
        userId: id,
      },
    });

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
