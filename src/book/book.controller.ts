import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    await this.bookService.create(createBookDto);
    return { message: 'Book created successfully' }
  }

  @Get('books')
  async findAll() {
    const books = await this.bookService.findAll();
    return {
      success: true,
      books,
      message: 'Books fetched successfully',
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(+id);

    return {
      success: true,
      book,
      message: 'Book fetched successfully',
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.update(+id, updateBookDto);

    return {
      success: true,
      book,
      message: 'Book updated successfully',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.bookService.remove(+id);

    return {
      success: true,
      message: 'Book removed successfully',
    }
  }
}
