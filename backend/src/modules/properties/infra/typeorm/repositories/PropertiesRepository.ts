import { ICreatePropertyDTO } from "@modules/properties/dtos/ICreatePropertyDTO";
import { IFindParamsDTO } from "@modules/properties/dtos/IFindParamsDTO";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";
import { getRepository, Repository } from "typeorm";
import { Property } from "../entities/Property";

class PropertiesRepository implements IPropertiesRepository {
  private ormRepository: Repository<Property>

  constructor() {
    this.ormRepository = getRepository(Property);
  }

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
    const property = this.ormRepository.create({
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
    });
    await this.ormRepository.save(property);
    return property;
  }

  public async findById(id: string): Promise<Property> {
    return await this.ormRepository.findOne({ id });
  }

  public async findByTitle(title: string): Promise<Property> {
    return await this.ormRepository.findOne({ title });
  }

  public async update(
    property: Property
  ): Promise<Property> {
    await this.ormRepository.save(property);
    return property;
  }

  public async find({ page, limit }: IFindParamsDTO): Promise<[properties: Property[], totalCount: number]> {
    return await this.ormRepository.findAndCount({
      order: {
        created_at: 'DESC',
        title: 'ASC'
      },
      take: limit,
      skip: (page - 1) * limit
    });
  }
  public async delete(id: string): Promise<boolean> {
    const deleted = await this.ormRepository.delete(id);
    return !!deleted;
  }
}

export { PropertiesRepository }