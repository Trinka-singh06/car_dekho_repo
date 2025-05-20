import { UsedCarDetail } from "src/used_car_details/entities/used_car_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seller {
 @PrimaryGeneratedColumn()
 selllerId:number;

 @Column()
 name:string;
 
 @Column()
 mobile:string;

 @Column()
 contactAdderess:string;

 @Column()
 email:string;
 
 @OneToMany(() => UsedCarDetail, (car) => car.seller)
 cars: UsedCarDetail[];
}
