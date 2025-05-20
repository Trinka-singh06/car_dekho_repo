import { Model } from "src/model/entities/model.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    engine: string;

    @Column()
    power:string;

    @Column()
    transmission: string;

    @Column()
    torgue: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({nullable:true})
    images: string;

    @Column()
    mileage:string;

    @Column()
    body_type:string;

    @Column()
    seating_capacity:number;

    @Column()
    launch_status:string;

    @Column()
    year:number;

    @Column()
    fueltype:string;

    @ManyToOne(()=>Model, (model)=>model.variants)
    model:Model;
}
