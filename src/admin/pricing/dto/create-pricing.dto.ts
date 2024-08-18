import { IsNotEmpty } from 'class-validator';

export class CreatePricingDto {
  @IsNotEmpty()
  litrePerKm: string;

  @IsNotEmpty()
  costPerGasLitre: string;

  @IsNotEmpty()
  pricePerKm: string;
}
