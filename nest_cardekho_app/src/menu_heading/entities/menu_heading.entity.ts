import { Category } from "src/category/entities/category.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenuHeading {

 @PrimaryGeneratedColumn()
 menuId:number;
 
 @Column()
 name:string;

 @OneToMany(()=>Category, (category)=>category.menuheading)
 category:Category[];

}
