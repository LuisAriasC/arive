import { BadRequestException, Body, Controller, Post, Query, Put, Get, Delete } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UserInputDTO } from 'src/modules/users/dto/user-input.dto';
import { UserService } from 'src/modules/users/user.service';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserDTO } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // Create user endpoint
    @Post('create')
    @ApiBody({ 
        type: UserInputDTO,
        required: true,
        description: 'Input to create a new user',
    })
    @ApiCreatedResponse({
        description: 'User created.',
        type: UserDTO,
    })
    public async createUser(
        @Body() input: UserInputDTO
    ): Promise<UserDTO> {
        try {
            return await this.userService.createOneUser(input);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Read user endpoint
    @Get()
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id to get users info',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'User found.',
        type: UserDTO
    })
    public async getUser(
        @Query('id') id: string
    ): Promise<UserDTO> {
        try {
            return await this.userService.getUser(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Update user endpoint
    @Put('update')
    @ApiBody({ 
        type: UserUpdateDTO,
        required: true,
        description: 'Input to update a user',
    })
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id of the user to update',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'User updated.',
        type: UserDTO
    })
    public async updateUser(
        @Body() input: UserUpdateDTO,
        @Query('id') id
    ): Promise<UserDTO> {
        try {
            return await this.userService.updateOneUser(id, input);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Delete user endpoint
    @Delete('delete')
    @ApiQuery({ 
        name: 'id', 
        required: true,
        type: String,
        description: 'Id of the user to delete',
        example: '61155ad1fa94427444ed8fa7'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'User deleted.',
        type: UserDTO
    })
    public async deleteUser(
        @Query('id') id
    ): Promise<UserDTO> {
        try {
            return await this.userService.deleteOneUser(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Get users endpoint
    @Get('users')
    @ApiResponse({ 
        status: 200, 
        description: 'List of users.',
        type: [UserDTO]
    })
    public async listUsers(): Promise<Array<UserDTO>> {
        try {
            return await this.userService.listUsers();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
