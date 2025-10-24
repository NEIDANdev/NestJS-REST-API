import { BadRequestException, Injectable } from '@nestjs/common';
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
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { name } = createBookDto

    const existingBook = await this.bookRepository.findOne({
      where: { name }
    });

    if (existingBook) {
      throw new BadRequestException({ message: 'This book already exists' })
    }

    const newBook = this.bookRepository.create(createBookDto)
    return await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new BadRequestException({ message: 'Book not found' })
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    const updateBook = this.bookRepository.merge(book, updateBookDto);
    return this.bookRepository.save(updateBook);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);

    return this.bookRepository.remove(book);
  }
}
