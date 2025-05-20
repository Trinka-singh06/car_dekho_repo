
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OTP } from './otp.entity';
import { CarSellRequest } from 'src/car-sell-request/entities/car-sell-request.entity';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true })
  mobileNumber: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ default: false })
  isAdmin: boolean;  // Add this field

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OTP, otp => otp.user)
  otps: OTP[];
  
  @OneToMany(() => CarSellRequest, request => request.user)
  sellRequests: CarSellRequest[];
}