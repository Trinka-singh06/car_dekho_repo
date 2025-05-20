import { Variant } from "src/variant/entities/variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isNew: boolean;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  kilometers: number;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => Variant)
  @JoinColumn()
  variant: Variant;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn()
  city: City;
}
