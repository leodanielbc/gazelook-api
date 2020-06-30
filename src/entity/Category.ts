import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

@Entity("category", { schema: "gazelookdb" })
export class Category {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 80 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 150 })
  description: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Project, (project) => project.idCategory2)
  projects: Project[];
}
