import { Model } from 'src/model/entities/model.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class CarType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Hatchback, Sedan, SUV, MUV, Luxury

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Model, model => model.carType)
  models: Model[];

  // Budget range for this car type
  @Column({ nullable: true })
  minBudget: number;

  @Column({ nullable: true })
  maxBudget: number;
}