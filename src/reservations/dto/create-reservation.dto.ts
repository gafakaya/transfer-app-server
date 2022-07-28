import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  fromWhere: string;

  @IsNotEmpty()
  @IsString()
  toWhere: string;

  @IsNotEmpty()
  @IsString()
  departureDate: string;

  @IsOptional()
  @IsString()
  isRoundTrip?: boolean;

  @IsOptional()
  @IsString()
  returnDate?: string;
}
