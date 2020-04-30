import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleEntity } from 'src/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity]), AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
