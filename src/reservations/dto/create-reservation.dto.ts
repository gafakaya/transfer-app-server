import {
  IsDateString,
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
  @IsDateString()
  departureDate: Date;

  @IsOptional()
  @IsString()
  isRoundTrip?: boolean;

  @IsOptional()
  @IsDateString()
  returnDate?: Date;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  distanceValue: number;

  @IsNotEmpty()
  distanceText: string;

  @IsNotEmpty()
  @IsNumber()
  durationValue: number;

  @IsNotEmpty()
  durationText: string;

  @IsNotEmpty()
  vehicleId: string;
}
