
import {Model, Column, Table, CreatedAt, UpdatedAt,DataType,ForeignKey,Unique,Default} from "sequelize-typescript";
import Teacher from './teacher';


@Table
export default class Student extends Model<Student> {
  @Unique
  @Column({type: DataType.STRING})
  email!: string;

  @ForeignKey(() => Teacher)
  @Column
  teacherId!: number;

  @Default('active')
  @Column
  status!: 'active' | 'inactive' | 'suspend';
  @Default('everyone')

  @Column
  notification!: 'specific' | 'everyone' 
 
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
