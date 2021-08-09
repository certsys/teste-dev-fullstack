import { AppError } from "@shared/errors/AppError";
import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { UpdatePropertyUseCase } from "./updatePropertyUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let updatePropertyUseCase: UpdatePropertyUseCase;

describe('Update Property', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    updatePropertyUseCase = new UpdatePropertyUseCase(fakePropertiesRepository);
  });

  it('should be able to edit property by id', async () => {
    const { id } = await fakePropertiesRepository.create({
      title: 'Fazenda Martins',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      public_place: 'Rua Martins Fazenda',
      house_number: 9463,
      complement: 'Fazenda',
      district: 'Zona Leste',
      cep: 84313630,
      city: 'Fazenda City',
      uf: 'FM',
    });

    const property = await updatePropertyUseCase.execute({
      id,
      title: 'Fazenda Martins Junior',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      public_place: 'Rua Martins Fazenda',
      house_number: 9463,
      complement: 'Fazenda',
      district: 'Zona Leste',
      cep: 84313630,
      city: 'Fazenda City',
      uf: 'FM',
    });

    expect(property);
  });

  it('should not be able to edit property, because id non-exists', async () => {
    await expect(updatePropertyUseCase.execute({
      id: 'id',
      title: 'Fazenda Martins Junior',
      description: 'Fazenda Martins da zona leste',
      value: 1200,
      area: 600,
      address: 'Rua Fazenda Martins',
      public_place: 'Rua Martins Fazenda',
      house_number: 9463,
      complement: 'Fazenda',
      district: 'Zona Leste',
      cep: 84313630,
      city: 'Fazenda City',
      uf: 'FM',
    })).rejects.toEqual(new AppError('Property not exist!', 404));
  });
});