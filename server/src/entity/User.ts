import { ObjectType, Field, ID, Root, registerEnumType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

registerEnumType(UserRole, { name: "role", description: "User access role" });

@Entity() @ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field(type => UserRole)
  @Column('enum', { default: UserRole["USER"], enum: UserRole })
  role: UserRole

  @Field({ nullable: true })
  @Column({ default: 0 })
  authCount: number
  
  @Column()
  password: string
}