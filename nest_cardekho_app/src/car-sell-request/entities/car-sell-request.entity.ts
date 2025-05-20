import { User } from "src/auth/user.entity";
import { UsedCarDetail } from "src/used_car_details/entities/used_car_detail.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarSellRequest {
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column()
  status: string; // 'pending', 'approved', 'rejected', 'listed'

  @Column({ nullable: true })
  comments: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @Column({ nullable: true })
  inspectionDate: Date;

  @Column({ nullable: true })
  valuationAmount: number;

  @ManyToOne(() => User, user => user.sellRequests)
  user: User;

  @OneToOne(() => UsedCarDetail, { nullable: true })
  carDetail: UsedCarDetail;
}