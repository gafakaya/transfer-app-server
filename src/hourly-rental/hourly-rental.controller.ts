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
import { HourlyRentalService } from './hourly-rental.service';
import { CreateHourlyRentalDto } from './dto/create-hourly-rental.dto';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';

@Controller('hourly-rental')
export class HourlyRentalController {
  constructor(private readonly hourlyRentalService: HourlyRentalService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(
    @Body() createHourlyRentalDto: CreateHourlyRentalDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.hourlyRentalService.create(userId, createHourlyRentalDto);
  }

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.hourlyRentalService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hourlyRentalService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
    @Body() updateHourlyRentalDto: Prisma.HourlyRentalUpdateInput,
  ) {
    return this.hourlyRentalService.update(
      id,
      currentUserId,
      updateHourlyRentalDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserId() currentUserId: string) {
    return this.hourlyRentalService.remove(id, currentUserId);
  }
}
