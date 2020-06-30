import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";

@Index("fk_content_project_idx", ["idProject"], {})
@Entity("contentdigital", { schema: "gazelookdb" })
export class Contentdigital {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "digitalContentUrl", nullable: true, length: 500 })
  digitalContentUrl: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("bigint", { name: "idProject" })
  idProject: number;

  @ManyToOne(() => Project, (project) => project.contentdigitals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idProject", referencedColumnName: "id" }])
  idProject2: Project;
}
