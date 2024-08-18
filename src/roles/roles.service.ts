import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(roleDto: Prisma.RoleCreateInput): Promise<Role> {
    const isExists = await this.isExistsRole(roleDto.role);

    if (isExists) throw new BadRequestException('This role is already exists.');

    const newRole = await this.prisma.role.create({
      data: {
        role: roleDto.role,
      },
    });

    return newRole;
  }

  async findOneById(id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) throw new NotFoundException('Role cannot found!');

    return role;
  }

  async findOneByRole(roleName: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: {
        role: roleName,
      },
    });

    if (!role) throw new NotFoundException('Role cannot found!');

    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  //* ----UTILITY FUNCTIONS----

  async isExistsRole(roleName: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: {
        role: roleName,
      },
    });

    if (role) return true;
    return false;
  }
}
