import { BadRequestException, Body, Controller, Post, Query, Put, Get, Delete } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { HobbyInputDTO } from 'src/modules/hobbies/dto/hobby-input.dto';
import { HobbyService } from 'src/modules/hobbies/hobby.service';
import { HobbyUpdateDTO } from './dto/hobby-update.dto';
import { HobbyDTO } from './dto/hobby.dto';

@ApiTags('hobby')
@Controller('hobby')
export class HobbyController {
    constructor(private readonly hobbyService: HobbyService) {}
  
    // Create hobby
    @Post('create')
    @ApiBody({ 
        type: HobbyInputDTO,
        required: true,
        description: 'Input to create a new hobby',
    })
    @ApiCreatedResponse({
        description: 'Hobby created.',
        type: HobbyDTO,
    })
    public async createHobby(
        @Body() input: HobbyInputDTO
    ): Promise<HobbyDTO> {
        try {
            return await this.hobbyService.createOneHobby(input);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Get hobby by id
    @Get()
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id to get hobby info',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Hobby found.',
        type: HobbyDTO
    })
    public async getHobby(
        @Query('id') id
    ): Promise<HobbyDTO> {
        try {
            return await this.hobbyService.getHobby(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Update hobby
    @Put('update')
    @ApiBody({ 
        type: HobbyUpdateDTO,
        required: true,
        description: 'Input to update a hobby',
    })
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id of the hobby to update',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Hobby updated.',
        type: HobbyDTO
    })
    public async updateHobby(
        @Body() input: HobbyUpdateDTO,
        @Query('id') id
    ): Promise<HobbyDTO> {
        try {
            return await this.hobbyService.updateOneHobby(id, input);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Soft delete one hobby
    @Delete('delete')
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id of the hobby to delete',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Hobby deleted.',
        type: HobbyDTO
    })
    public async deleteHobby(
        @Query('id') id
    ): Promise<HobbyDTO> {
        try {
            return await this.hobbyService.deleteOneHobby(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // List hobbies by user
    @Get('user-hobbies')
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id of the user to get his hobbies',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'List of user hobbies.',
        type: [HobbyDTO]
    })
    public async listHobbiesByUser(
        @Query('id') id
    ): Promise<Array<HobbyDTO>> {
        try {
            return await this.hobbyService.listHobbiesByUser(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
