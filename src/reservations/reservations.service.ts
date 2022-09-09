import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Reservation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const {
      originLat,
      originLng,
      originName,
      destinationLat,
      destinationLng,
      destinationName,
      departureTimestamp,
      returnTimestamp,
    } = createReservationDto;
    const isRoundTrip = Boolean(createReservationDto.isRoundTrip);

    const newReservation = await this.prisma.reservation.create({
      data: {
        originLat,
        originLng,
        originName,
        destinationLat,
        destinationLng,
        destinationName,
        departureTimestamp,
        isRoundTrip,
        returnTimestamp,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newReservation;
  }

  async findAll(userId: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    return reservation;
  }

  async update(
    id: string,
    currentUserId: string,
    updateReservationDto: Prisma.ReservationUpdateInput,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (currentUserId !== reservation.userId)
      throw new ForbiddenException('You cant update this reservation');

    return await this.prisma.reservation.update({
      where: {
        id,
      },
      data: updateReservationDto,
    });
  }

  async remove(id: string, currentUserId: string): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (currentUserId !== reservation.userId)
      throw new ForbiddenException('You cant update this reservation');

    return await this.prisma.reservation.delete({
      where: {
        id,
      },
    });
  }

  //*----UTILITY FUNCTIONS----

  async isExixtsReservation(id: string): Promise<boolean> {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
    });

    if (reservation) return true;
    return false;
  }
}
