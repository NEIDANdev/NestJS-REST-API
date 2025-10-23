import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return {message: 'User created successfully!'}
  }

  @Get('users')
  async findAll() {
    const users = await this.userService.findAll();
    return {
      success: true,
      users,
      message:  'Users fetched successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return {
      success: true,
      user,
      message: 'User fetched successfully',
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(+id, updateUserDto);

    return {
      success: true,
      updatedUser,
      message: 'User updated successfully',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);

    return {
      success: true,
      message: 'User removed successfully',
    }
  }
}
