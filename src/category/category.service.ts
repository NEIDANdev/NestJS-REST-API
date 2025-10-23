import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const existingCategory = await this.categoryRepository.findOne({
      where: { name }
    });

    if (existingCategory) {
      throw new BadRequestException({ message: 'This category already exists' })
    }

    const newCategory = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new BadRequestException({ message: 'Category not found' })
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    const updateCategory = this.categoryRepository.merge(category, updateCategoryDto);
    return this.categoryRepository.save(updateCategory)
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id)

    return this.categoryRepository.remove(category)
  }
}
