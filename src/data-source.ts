import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Book } from './book/entities/book.entity';
import { Category } from './category/entities/category.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5434),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'nest',
  entities: [User, Book, Category],
  migrations: ['src/migrations/*.ts'],
})
