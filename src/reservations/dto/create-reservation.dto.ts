import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDecimal()
  originLat: number;

  @IsNotEmpty()
  @IsDecimal()
  originLng: number;

  @IsNotEmpty()
  @IsDecimal()
  destinationLat: number;

  @IsNotEmpty()
  @IsDecimal()
  destinationLng: number;

  @IsNotEmpty()
  @IsNumber()
  departureTimestamp: number;

  @IsOptional()
  @IsString()
  isRoundTrip?: boolean;

  @IsOptional()
  @IsNumber()
  returnTimestamp?: number;
}
