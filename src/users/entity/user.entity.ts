import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column('character varying', {
    length: 25,
  })
  first_name: string;

  @Column('character varying', {
    length: 50,
    nullable: true,
  })
  last_name: string;

  @Column('character varying', {
    length: 20,
    unique: true,
  })
  phone_number: string;

  @Column('text', {
    nullable: true,
  })
  avatar_url: string;

  @Column('character varying', {
    length: 16,
    nullable: true,
  })
  password: string;

  @Column('integer', {
    nullable: true,
  })
  vk_user_id: number;
}
