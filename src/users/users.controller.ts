import { RolesGuard } from './../common/guards/roles.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enums';
import { AccessTokenGuard } from 'src/common/guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  findMe(@GetCurrentUserId() currentUserId: string): Promise<User> {
    return this.usersService.findMe(currentUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update(id, currentUserId, updateUserDto);
  }

  @Patch('makeadmin/:id')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Roles(ERole.ADMIN)
  makeAdmin(@Param('id') id: string): Promise<User> {
    return this.usersService.makeAdmin(id);
  }

  @Patch('removeadmin/:id')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Roles(ERole.ADMIN)
  removeAdmin(@Param('id') id: string): Promise<User> {
    return this.usersService.removeAdmin(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Roles(ERole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
