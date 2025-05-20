// otp.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'otps' })
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.otps)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 6 })
  otp: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}