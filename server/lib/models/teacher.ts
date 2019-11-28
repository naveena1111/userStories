import {Model, Column, Table, CreatedAt, UpdatedAt,DataType,HasMany, Unique} from "sequelize-typescript";
import Student from './student';



@Table
export default class Teacher extends Model<Teacher> {
  @Unique
  @Column({type: DataType.STRING})
  email!: string;
  
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Student)
  students?: Student[];

}