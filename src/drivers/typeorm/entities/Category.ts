import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

@Entity("category", { schema: "gazelookdb" })
export class Category {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 80 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 150 })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @OneToMany(() => Project, (project) => project.idCategory2)
  projects: Project[];
}
