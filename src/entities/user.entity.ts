import { AbstractEntity } from './abstract-entity';
import {
  Column,
  BeforeInsert,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ArticleEntity } from './article.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @JoinTable()
  @ManyToMany(
    type => UserEntity,
    user => user.followee,
  )
  followers: UserEntity[];

  @ManyToMany(
    type => UserEntity,
    user => user.followers,
  )
  followee: UserEntity[];

  @OneToOne(
    type => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];

  @ManyToMany(
    type => ArticleEntity,
    article => article.favoritedBy,
  )
  @JoinColumn()
  favorites: ArticleEntity[];

  // TODO: add following
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }

  toProfile(user?: UserEntity) {
    let following = null;
    if (user) {
      following = this.followers.includes(user);
    }
    const profile: any = this.toJSON();
    delete profile.followers;
    return { ...profile, following };
  }
}
