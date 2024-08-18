import { Vehicle } from '@prisma/client';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { vehicleName, vehicleDescription } = createVehicleDto;

    const capacity = parseInt(createVehicleDto.capacity);
    const basePrice = parseInt(createVehicleDto.basePrice);

    const vehicle = await this.prisma.vehicle.create({
      data: {
        vehicleName,
        vehicleDescription,
        capacity,
        basePrice,
      },
    });

    return vehicle;
  }

  async addImage(vehicleId: string, imageName: string) {
    return await this.prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        imageName,
      },
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found!');

    return vehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.prisma.vehicle.findMany();
  }
}
