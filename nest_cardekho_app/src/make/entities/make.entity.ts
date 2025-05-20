import { Category } from "src/category/entities/category.entity";
import { Model } from "src/model/entities/model.entity";
import { UsedCarDetail } from "src/used_car_details/entities/used_car_detail.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Make {
  [x: string]: any;
 @PrimaryGeneratedColumn()
   makeId:number;

   @Column()
   name:string;

   @Column()
   logo:string;

   @ManyToOne( ()=> Category, (category) => category.makes)
   category:Category

    @OneToMany(()=> Model, (model) => model.make)
    models:Model[];

    @OneToMany(() => UsedCarDetail, (usedCar) => usedCar.make)
     usedCars: UsedCarDetail[];
}
