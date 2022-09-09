import { Prisma, User } from '@prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMe(currentUserId: string): Promise<User> {
    return await this.findOne(currentUserId);
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: true,
      },
    });
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async update(
    id: string,
    currentUserId: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    await this.findOne(id);

    if (id !== currentUserId)
      throw new ForbiddenException('You cant update this user.');

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

  async makeAdmin(userId: string): Promise<User> {
    await this.findOne(userId);

    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect: {
            role: 'admin',
          },
        },
      },
    });

    return user;
  }

  async removeAdmin(userId: string): Promise<User> {
    await this.findOne(userId);

    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          disconnect: {
            role: 'admin',
          },
        },
      },
    });

    return user;
  }
}
