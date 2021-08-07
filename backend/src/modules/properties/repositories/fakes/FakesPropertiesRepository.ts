import { ICreatePropertyDTO } from "../../dtos/ICreatePropertyDTO";
import { Property } from "../../infra/typeorm/entities/Property";
import { IPropertiesRepository } from '../IPropertiesRepository';

class FakePropertiesRepository implements IPropertiesRepository {
  private properties: Property[] = [];

  public async create({
    title,
    description,
    value,
    area,
    address,
    public_place,
    house_number,
    complement,
    district,
    cep,
    city,
    uf,
  }: ICreatePropertyDTO): Promise<Property> {
    const property = new Property();

    Object.assign(property, {
      title,
      description,
      value,
      area,
      address,
      public_place,
      house_number,
      complement,
      district,
      cep,
      city,
      uf,
      created_at: new Date()
    });

    this.properties.push(property);

    return property;
  }

  public async findById(id: string): Promise<Property> {
    return this.properties.find((model) => model.id === id);
  }

  public async findByTitle(title: string): Promise<Property> {
    return this.properties.find((model) => model.title === title);
  }

  public async update(
   data: Property
  ): Promise<Property> {
    const property = new Property();
    const propertyIndex = this.properties.findIndex(
      p => p.id === data.id
    );

    Object.assign(property, {
      data
    });

    this.properties[propertyIndex] = property;
    return property;
  }

  public async find(): Promise<Property[]> {
    return this.properties;
  }

  public async delete(id: string): Promise<boolean> {
    const properties = this.properties.filter(
      p => p.id !== id
    );

    this.properties = properties;
    return true;
  }
}

export { FakePropertiesRepository }