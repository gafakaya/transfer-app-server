import { Module } from '@nestjs/common';
import { HourlyRentalService } from './hourly-rental.service';
import { HourlyRentalController } from './hourly-rental.controller';

@Module({
  controllers: [HourlyRentalController],
  providers: [HourlyRentalService],
})
export class HourlyRentalModule {}
