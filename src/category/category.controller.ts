import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryService.create(createCategoryDto);
    return {message: 'Category created successfully'}
  }

  @Get('categories')
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      success: true,
      categories,
      message: 'Categories fetched successfully',
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);

    return {
      success: true,
      category,
      message: 'Category fetched successfully',
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(+id, updateCategoryDto);

    return {
      success: true,
      category,
      message: 'Category updated successfully',
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
