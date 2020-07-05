import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Accountuser } from "./Accountuser";
import { Address } from "./Address";
import { Project } from "./Project";

@Entity("user", { schema: "gazelookdb" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 80 })
  name: string;

  @Column("varchar", { name: "lastname", length: 80 })
  lastname: string;

  @Column("varchar", { name: "contactName", length: 50 })
  contactName: string;

  @Column("varchar", { name: "phone", nullable: true, length: 150 })
  phone: string | null;

  @Column("varchar", { name: "imageUrl", nullable: true, length: 500 })
  imageUrl: string | null;

  @Column("varchar", { name: "profileType", nullable: true, length: 50 })
  profileType: string | null;

  @Column("tinyint", { name: "active", nullable: true, width: 1 })
  active: boolean | null;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @OneToMany(() => Accountuser, (accountuser) => accountuser.idUser2)
  accountusers: Accountuser[];

  @OneToMany(() => Address, (address) => address.idUser2)
  addresses: Address[];

  @OneToMany(() => Project, (project) => project.idUser2)
  projects: Project[];
}
