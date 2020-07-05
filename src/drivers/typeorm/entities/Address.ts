import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Index("fk_address_user_idx", ["idUser"], {})
@Entity("address", { schema: "gazelookdb" })
export class Address {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "country", length: 45 })
  country: string;

  @Column("varchar", { name: "city", length: 45 })
  city: string;

  @Column("varchar", { name: "postalCode", length: 20 })
  postalCode: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column("bigint", { name: "idUser"})
  idUser: number;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser2: User;
}
