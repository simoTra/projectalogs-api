import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PrinterService } from './printer.service';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';
import { Printer } from './entities/printer.entity';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post()
  create(@Body() createPrinterDto: CreatePrinterDto): Promise<Printer> {
    return this.printerService.create(createPrinterDto);
  }

  @Get()
  findAll(): Promise<Printer[]> {
    return this.printerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Printer> {
    return this.printerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrinterDto: UpdatePrinterDto,
  ): Promise<Printer> {
    return this.printerService.update(+id, updatePrinterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.printerService.remove(id);
  }

  @Get('/sync')
  async syncJobs(): Promise<string> {
    const url =
      'http://192.168.1.101:4408/server/history/list';
/*     const url =
      'http://100.113.166.1/printers/1557981001/fluidd/server/history/list'; */
    await this.printerService.fetchAndSaveJobsFromPrinter(url);
    return 'Jobs fetched and saved successfully';
  }
}
