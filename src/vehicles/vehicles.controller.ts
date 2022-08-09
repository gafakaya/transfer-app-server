import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Vehicle } from '@prisma/client';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  createVehcile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'jpeg|jpg|png' })],
      }),
    )
    file: Express.Multer.File,
    @Body() createVehcileDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const fileName = file?.filename;
    console.log(file);
    return this.vehiclesService.create(fileName, createVehcileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @Get('')
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get('/image/:imagePath')
  image(@Param('imagePath') imagePath: string, @Res() res) {
    return res.sendFile(imagePath, { root: 'uploads' });
  }
}
