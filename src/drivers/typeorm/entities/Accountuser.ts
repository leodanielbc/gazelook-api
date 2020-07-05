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

@Index("fk_user_accountUser_idx", ["idUser"], {})
@Entity("accountuser", { schema: "gazelookdb" })
export class Accountuser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 150 })
  email: string;

  @Column({ nullable: true })
  salt?: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "language", length: 60 })
  language: string;

  @Column("tinyint", { name: "active", nullable: true, width: 1 })
  active: boolean | null;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column("bigint", { name: "idUser" })
  idUser: number;

  @ManyToOne(() => User, (user) => user.accountusers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser2: User;
}
