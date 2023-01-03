import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { Sheet } from './sheet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sheet])],
    controllers: [SheetsController],
    providers: [SheetsService],
})
export class SheetsModule {}
