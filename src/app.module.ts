import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ReservationsModule } from './reservations/reservations.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { HourlyRentalModule } from './hourly-rental/hourly-rental.module';
import { PricingModule } from './admin/pricing/pricing.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    RolesModule,
    ReservationsModule,
    VehiclesModule,
    HourlyRentalModule,
    PricingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
