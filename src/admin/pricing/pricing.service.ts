import { Pricing } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}
  async create(createPricingDto: CreatePricingDto): Promise<Pricing> {
    const costPerGasLitre = parseFloat(createPricingDto.costPerGasLitre);
    const litrePerKm = parseFloat(createPricingDto.litrePerKm);
    const pricePerKm = parseFloat(createPricingDto.pricePerKm);

    const newPricing = await this.prisma.pricing.create({
      data: {
        costPerGasLitre,
        litrePerKm,
        pricePerKm,
      },
    });

    return newPricing;
  }

  async findAll(): Promise<Pricing[]> {
    return await this.prisma.pricing.findMany();
  }

  async findOne(id: string): Promise<Pricing> {
    const pricing = await this.prisma.pricing.findUnique({
      where: {
        id,
      },
    });

    if (!pricing) throw new NotFoundException('Pricing not found');

    return pricing;
  }

  async findActive(): Promise<Pricing> {
    const activePricing = await this.prisma.pricing.findFirst({
      where: {
        isActive: true,
      },
    });

    return activePricing;
  }

  async update(
    id: string,
    updatePricingDto: UpdatePricingDto,
  ): Promise<Pricing> {
    const costPerGasLitre = parseFloat(updatePricingDto.costPerGasLitre);
    const litrePerKm = parseFloat(updatePricingDto.litrePerKm);
    const pricePerKm = parseFloat(updatePricingDto.pricePerKm);

    await this.findOne(id);

    return await this.prisma.pricing.update({
      where: {
        id,
      },
      data: {
        costPerGasLitre,
        litrePerKm,
        pricePerKm,
      },
    });
  }

  async setActive(id: string): Promise<Pricing> {
    const currentActive = await this.findActive();
    await this.prisma.pricing.update({
      where: {
        id: currentActive.id,
      },
      data: {
        isActive: false,
      },
    });

    return await this.prisma.pricing.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
  }

  async remove(id: string): Promise<Pricing> {
    await this.findOne(id);

    return await this.prisma.pricing.delete({
      where: {
        id,
      },
    });
  }
}
