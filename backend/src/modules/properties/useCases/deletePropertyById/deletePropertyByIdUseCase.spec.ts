import { AppError } from "@shared/errors/AppError";
import { FakePropertiesRepository } from "../../repositories/fakes/FakesPropertiesRepository";
import { DeletePropertyByIdUseCase } from "./deletePropertyByIdUseCase";

let fakePropertiesRepository: FakePropertiesRepository;
let deletePropertyByIdUseCase: DeletePropertyByIdUseCase;

describe('Delete Property By Id', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    deletePropertyByIdUseCase = new DeletePropertyByIdUseCase(fakePropertiesRepository);
  });

  it('should be able to remove property by id', async () => {
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

    const property = await deletePropertyByIdUseCase.execute(id);

    expect(property).toEqual(true);
  });

  it('should not be able to remove property by id, because id non-exists', async () => {
    await expect(
      deletePropertyByIdUseCase.execute('non-id')
    ).rejects.toEqual(new AppError('Property not exist!', 404));
  });
});