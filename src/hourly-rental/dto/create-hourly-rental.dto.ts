import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateHourlyRentalDto {
  @IsNotEmpty()
  @IsNumber()
  originLat: number;

  @IsNotEmpty()
  @IsNumber()
  originLng: number;

  @IsNotEmpty()
  originName: string;

  @IsNotEmpty()
  @IsNumber()
  departureTimestamp: number;

  @IsOptional()
  @IsNumber()
  duration: number;
}
