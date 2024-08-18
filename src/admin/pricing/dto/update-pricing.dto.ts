import { IsOptional } from 'class-validator';

export class UpdatePricingDto {
  @IsOptional()
  litrePerKm?: string;

  @IsOptional()
  costPerGasLitre?: string;

  @IsOptional()
  pricePerKm?: string;

  @IsOptional()
  isActive?: boolean;
}
