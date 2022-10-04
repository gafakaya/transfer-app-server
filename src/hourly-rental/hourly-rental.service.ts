import { HourlyRental, Prisma } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateHourlyRentalDto } from './dto/create-hourly-rental.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HourlyRentalService {
  constructor(private prisma: PrismaService) {}
  async create(
    userId: string,
    createHourlyRentalDto: CreateHourlyRentalDto,
  ): Promise<HourlyRental> {
    const { originLat, originLng, originName, departureTimestamp, duration } =
      createHourlyRentalDto;
    const newHourlyRental = await this.prisma.hourlyRental.create({
      data: {
        originLat,
        originLng,
        originName,
        departureTimestamp,
        duration,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newHourlyRental;
  }

  async findAll(userId: string): Promise<HourlyRental[]> {
    return await this.prisma.hourlyRental.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string): Promise<HourlyRental> {
    const hourlyRental = await this.prisma.hourlyRental.findUnique({
      where: {
        id,
      },
    });

    if (!hourlyRental) throw new NotFoundException('Hourly Rental not found');

    return hourlyRental;
  }

  async update(
    id: string,
    currentUserId: string,
    updateHourlyRentalDto: Prisma.HourlyRentalUpdateInput,
  ): Promise<HourlyRental> {
    const hourlyRental = await this.findOne(id);

    if (currentUserId !== hourlyRental.userId)
      throw new ForbiddenException('You cannot update this hourly rental');

    return await this.prisma.hourlyRental.update({
      where: {
        id,
      },
      data: updateHourlyRentalDto,
    });
  }

  async remove(id: string, currentUserId: string): Promise<HourlyRental> {
    const hourlyRental = await this.findOne(id);

    if (currentUserId !== hourlyRental.userId)
      throw new ForbiddenException('You cannot delete this hourly rental');

    return await this.prisma.hourlyRental.delete({
      where: {
        id,
      },
    });
  }
}
