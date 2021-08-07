import { AppError } from "@shared/errors/AppError";
import { FakeHashProvider } from "../../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository";
import { CreateUserUseCase } from "./CreateUseUseCase";

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository, hashProvider);
  });

  it('should be able to create new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new user, because email already exists', async () => {
    await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    await expect(createUserUseCase.execute({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
});