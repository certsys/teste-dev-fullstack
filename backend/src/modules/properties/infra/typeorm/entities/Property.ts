import { Column, CreateDateColumn, Double, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('properties')
class Property {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  area: number;

  @Column()
  address: string;

  @Column()
  public_place: string;

  @Column()
  house_number: number;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  cep: number;

  @Column()
  city: string;

  @Column()
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Property }