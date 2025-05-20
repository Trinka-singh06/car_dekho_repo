import { Make } from "src/make/entities/make.entity";
import { MenuHeading } from "src/menu_heading/entities/menu_heading.entity";
import { UsedCarDetail } from "src/used_car_details/entities/used_car_detail.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    name: string;

    @Column({ default: true })
    hasSubCategory: boolean;
     
    @OneToMany(() => Make, (make) => make.category)
    makes: Make[];

    @OneToMany(() => UsedCarDetail, (cars) => cars.category)
    cars:UsedCarDetail

    @ManyToOne(() => MenuHeading, (menuheading) => menuheading.category)
    menuheading: MenuHeading
}
