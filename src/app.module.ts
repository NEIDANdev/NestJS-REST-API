import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, AuthorsModule, CategoriesModule],
})
export class AppModule {}

