import { RolesGuard } from './../common/guards/roles.guard';
import { Prisma, Role } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enums';
import { AccessTokenGuard } from 'src/common/guards';

@UseGuards(RolesGuard)
@UseGuards(AccessTokenGuard)
@Roles(ERole.ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: Prisma.RoleCreateInput): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':role')
  @HttpCode(HttpStatus.OK)
  findOneByRoleName(@Param('role') role: string): Promise<Role> {
    return this.rolesService.findOneByRole(role);
  }
}
