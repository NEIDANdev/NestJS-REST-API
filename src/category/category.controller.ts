import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryService.create(createCategoryDto);
    return {message: 'Category created successfully'}
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      data: categories,
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);

    return {
      data: category,
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(+id, updateCategoryDto);

    return {
      data: category,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);

    return {
      success: true,
      message: 'Category removed successfully',
    }
  }
}
