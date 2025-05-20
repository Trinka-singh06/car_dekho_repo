
import { CarType } from "src/car/entities/cartype.entity";
import { Make } from "src/make/entities/make.entity";
import { Variant } from "src/variant/entities/variant.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  modelId: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  engine:string;

  @Column()
  power:string;

  @Column()
  transmission:string;

  @Column()
  torgue:string;

  @Column()
  body_type:string;

  @Column()
  seating_capacity:number;

  @Column()
  launch_status:string;

  @Column()
  year:number;

  @Column({ nullable: true })
  images:string;

  @Column()
  mileage:string;

  @Column()
  fueltype:string;

  @ManyToOne(() => Make, (make) => make.models)
  make: Make;

  @OneToMany(() => Variant, (variant) => variant.model)
  variants: Variant[];

}