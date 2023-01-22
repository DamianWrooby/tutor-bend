import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDto } from './dtos/create-sheet.dto';
import { UpdateSheetDto } from './dtos/update-sheet.dto';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';

@Controller('sheets')
export class SheetsController {
    constructor(private sheetsService: SheetsService) {}

    @Get('/:id')
    async findSheet(@Param('id') id: string) {
        const sheet = this.sheetsService.findOne(parseInt(id));
        if (!sheet) {
            throw new NotFoundException('Sheet not found');
        }
        return sheet;
    }

    @Post('')
    createSheet(@Body() body: CreateSheetDto, @CurrentUser() user: User) {
        this.sheetsService.create(
            body.title,
            body.subject,
            body.description,
            body.privacy,
            user
        );
    }

    @Patch('/:id')
    updateSheet(@Param('id') id: string, @Body() body: UpdateSheetDto) {
        this.sheetsService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeSheet(@Param('id') id: string) {
        this.sheetsService.remove(parseInt(id));
    }
}
