import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'app' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nick: string;
}
