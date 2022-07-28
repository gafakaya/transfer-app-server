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
import { GetCurrentUserId } from 'src/common/decorators';

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

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.reservationsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: Prisma.ReservationUpdateInput,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
