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
      departureDate,
      returnDate,
      distanceText,
      distanceValue,
      durationValue,
      durationText,
      totalPrice,
      vehicleId,
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
        departureDate,
        isRoundTrip,
        returnDate,
        distanceText,
        distanceValue,
        durationText,
        durationValue,
        totalPrice,
        user: {
          connect: {
            id: userId,
          },
        },
        vehicle: {
          connect: {
            id: vehicleId,
          },
        },
      },
    });

    return newReservation;
  }

  async findAllOwn(userId: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findAllUpToDateOwn(userId: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        userId,
        departureDate: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findAllUpToDate(): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        departureDate: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findAllPastOwn(userId: string): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        userId,
        departureDate: {
          lt: new Date(),
        },
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findAllPast(): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany({
      where: {
        departureDate: {
          lt: new Date(),
        },
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        vehicle: true,
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
      include: {
        user: true,
        vehicle: true,
      },
    });
  }

  async remove(id: string, currentUserId: string): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (currentUserId !== reservation.userId)
      throw new ForbiddenException('You cant delete this reservation');

    return await this.prisma.reservation.delete({
      where: {
        id,
      },
      include: {
        user: true,
        vehicle: true,
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
