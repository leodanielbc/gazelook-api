import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Project } from "./Project";

@Index("fk_content_project_idx", ["idProject"], {})
@Entity("contentdigital", { schema: "gazelookdb" })
export class Contentdigital {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "digitalContentUrl", nullable: true, length: 500 })
  digitalContentUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column("bigint", { name: "idProject" })
  idProject: number;

  @ManyToOne(() => Project, (project) => project.contentdigitals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idProject", referencedColumnName: "id" }])
  idProject2: Project;
}
