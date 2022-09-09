import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
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
  destinationLat: number;

  @IsNotEmpty()
  @IsNumber()
  destinationLng: number;

  @IsNotEmpty()
  destinationName: string;

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
