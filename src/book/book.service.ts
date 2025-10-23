import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ){}

  create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto)

    return this.bookRepository.save(newBook);
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
