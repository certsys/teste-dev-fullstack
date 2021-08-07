import { ICreatePropertyDTO } from "../dtos/ICreatePropertyDTO";
import { Property } from "../infra/typeorm/entities/Property";

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
  findById(id: string): Promise<Property>;
  findByTitle(title: string): Promise<Property>;
  find(): Promise<Property[]>;
  update(property: Property): Promise<Property>;
  delete(id: string): Promise<boolean>;
}

export { IPropertiesRepository }