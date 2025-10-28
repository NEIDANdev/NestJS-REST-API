import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    await this.bookService.create(createBookDto);
    return { message: 'Book created successfully' }
  }

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    return {
      data: books,
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(+id);

    return {
      data: book,
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.update(+id, updateBookDto);

    return {
      data: book,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.bookService.remove(+id);

    return {
      message: 'Book removed successfully',
    }
  }
}
