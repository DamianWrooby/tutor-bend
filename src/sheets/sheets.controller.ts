import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDto } from './dtos/create-sheet.dto';
import { UpdateSheetDto } from './dtos/update-sheet.dto';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { SheetDto } from './dtos/sheet.dto';
import { Sheet } from './sheet.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from './../guards/role.guard';
import { UserRole } from '../enums/user.enum';
import { Privacy } from 'src/enums/sheet.enum';

@Controller('sheets')
export class SheetsController {
    constructor(private sheetsService: SheetsService) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Serialize(SheetDto)
    async findSheet(@Param('id') id: string, @CurrentUser() user: User) {
        const sheet = await this.sheetsService.findOne(parseInt(id));
        if (!sheet) {
            throw new NotFoundException('Sheet not found');
        }
        if (!this.canManageSheet(sheet, user)) {
            throw new NotFoundException('Inufficient permissions');
        }
        return sheet;
    }

    @Post('')
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard([UserRole.TEACHER, UserRole.ADMIN]))
    @Serialize(SheetDto)
    createSheet(@Body() body: CreateSheetDto, @CurrentUser() user: User) {
        return this.sheetsService.create(
            body.title,
            body.subject,
            body.description,
            body.questionIds,
            body.privacy,
            user
        );
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard([UserRole.TEACHER, UserRole.ADMIN]))
    async updateSheet(
        @Param('id') id: string,
        @Body() body: UpdateSheetDto,
        @CurrentUser() user: User
    ) {
        const sheet = await this.sheetsService.findOne(parseInt(id));
        if (!this.canManageSheet(sheet, user)) {
            throw new NotFoundException('Inufficient permissions');
        } else {
            this.sheetsService.update(parseInt(id), body);
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard([UserRole.TEACHER, UserRole.ADMIN]))
    async removeSheet(@Param('id') id: string, @CurrentUser() user: User) {
        const sheet = await this.sheetsService.findOne(parseInt(id));
        if (!this.canManageSheet(sheet, user)) {
            throw new NotFoundException('Inufficient permissions');
        } else {
            this.sheetsService.remove(parseInt(id));
        }
    }

    private canManageSheet(sheet: Sheet, user: User): boolean {
        if (
            sheet.privacy === Privacy.PRIVATE &&
            sheet.createdBy.id !== user.id
        ) {
            return false;
        }
        return true;
    }
}
