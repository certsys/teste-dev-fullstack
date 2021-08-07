import { AppError } from "@shared/errors/AppError";
import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { CreatePropertyUseCase } from "./createPropertyUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let createPropertyUseCase: CreatePropertyUseCase;

describe('Create Propert', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    createPropertyUseCase = new CreatePropertyUseCase(fakePropertiesRepository);
  });

  it('should be able to create new user', async () => {
    const property = await createPropertyUseCase.execute({
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

    expect(property).toHaveProperty('id');
  });

  it('should not be able to create new user, because email already exists', async () => {
    await fakePropertiesRepository.create({
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

    await expect(createPropertyUseCase.execute({
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
    })).rejects.toEqual(new AppError('Property already exist!'));
  });
});