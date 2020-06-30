import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("bigint", { name: "idUser"})
  idUser: number;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser2: User;
}
