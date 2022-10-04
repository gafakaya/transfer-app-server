import { CreatePricingDto } from './dto/create-pricing.dto';
import { AccessTokenGuard } from './../../common/guards/accesstoken.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller('pricing')
@UseGuards(AccessTokenGuard)
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  create(@Body() createPricingDto: CreatePricingDto) {
    return this.pricingService.create(createPricingDto);
  }

  @Get()
  findAll() {
    return this.pricingService.findAll();
  }

  @Get('/active')
  findActive() {
    return this.pricingService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingDto: UpdatePricingDto) {
    return this.pricingService.update(id, updatePricingDto);
  }

  @Patch('/setactive/:id')
  setActive(@Param('id') id: string) {
    return this.pricingService.setActive(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingService.remove(id);
  }
}
