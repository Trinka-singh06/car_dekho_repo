import { Category } from "src/category/entities/category.entity";
import { Make } from "src/make/entities/make.entity";
import { Seller } from "src/seller/entities/seller.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsedCarDetail {
    @PrimaryGeneratedColumn()
    carId: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    images: string;

    @Column()
    carNumber: string;

    @Column()
    price: string;

    @Column()
    lenght: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    fuelType: string;

    @Column()
    registrationYear: string;

    @Column()
    insurance: string;

    @Column()
    seats: number;

    @Column()
    kmsDriven: string;

    @Column()
    Rto: string;

    @Column()
    ownership: string;

    @Column()
    engine: string;

    @Column()
    mileage: string;

    @Column()
    power: string;

    @Column()
    numberofAirbags: number;

    @Column()
    engineDisplacement: string;

    @Column()
    transmission: string;

    @Column()
    body_type: string;

    @Column()
    yearofManufacture: number;

    @ManyToOne(() => Category, (category) => category.cars)
    category: Category;

    @ManyToOne(() => Seller, (seller) => seller.cars)
    seller: Seller;
    
    @ManyToOne(() => Make, (make) => make.usedCars)
    make: Make;
    
}
