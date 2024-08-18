import { RolesGuard } from './../common/guards/roles.guard';
import { AccessTokenGuard } from './../common/guards/accesstoken.guard';
import { Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enums';

@Controller('reservations')
@UseGuards(AccessTokenGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.reservationsService.create(userId, createReservationDto);
  }

  @Get(`/own`)
  findAllOwn(@GetCurrentUserId() userId: string) {
    return this.reservationsService.findAllOwn(userId);
  }

  @Get(`own/uptodate`)
  findAllUpToDateOwn(@GetCurrentUserId() userId: string) {
    return this.reservationsService.findAllUpToDateOwn(userId);
  }

  @Get(`all/uptodate`)
  @UseGuards(RolesGuard)
  @Roles(ERole.ADMIN)
  findAllUpToDate() {
    return this.reservationsService.findAllUpToDate();
  }

  @Get(`own/past`)
  findAllPastOwn(@GetCurrentUserId() userId: string) {
    return this.reservationsService.findAllPastOwn(userId);
  }

  @Get(`all/past`)
  @UseGuards(RolesGuard)
  @Roles(ERole.ADMIN)
  findAllPast() {
    return this.reservationsService.findAllPast();
  }

  @Get(':id')
  findOneOwn(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
    @Body() updateReservationDto: Prisma.ReservationUpdateInput,
  ) {
    return this.reservationsService.update(
      id,
      currentUserId,
      updateReservationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserId() currentUserId: string) {
    return this.reservationsService.remove(id, currentUserId);
  }
}
