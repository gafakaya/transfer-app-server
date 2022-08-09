import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  vehicleName: string;

  @IsNotEmpty()
  @IsString()
  vehicleDescription: string;

  @IsNotEmpty()
  capacity: string;

  @IsNotEmpty()
  basePrice: string;
}
