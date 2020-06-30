import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contentdigital } from "./Contentdigital";
import { Category } from "./Category";
import { User } from "./User";

@Index("fk_project_category_idx", ["idCategory"], {})
@Index("fk_user_accountUser_idx", ["idUser"], {})
@Entity("project", { schema: "gazelookdb" })
export class Project {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 150 })
  title: string | null;

  @Column("varchar", { name: "shortTitle", nullable: true, length: 50 })
  shortTitle: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("bigint", { name: "idUser" })
  idUser: number;

  @Column("bigint", { name: "idCategory" })
  idCategory: number;

  @OneToMany(
    () => Contentdigital,
    (contentdigital) => contentdigital.idProject2
  )
  contentdigitals: Contentdigital[];

  @ManyToOne(() => Category, (category) => category.projects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idCategory", referencedColumnName: "id" }])
  idCategory2: Category;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser2: User;
}
