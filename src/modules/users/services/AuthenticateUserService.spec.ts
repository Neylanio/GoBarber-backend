import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "neylanio",
      password: "123456"
    });

    const response = await authenticateUser.execute({
      email: "neylanio@gmail.com",
      password: "123456"
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });

  it('should be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: "neylanio@gmail.com",
      password: "123456"
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "neylanio",
      password: "123456"
    });

    await expect(authenticateUser.execute({
      email: "neylanio@gmail.com",
      password: "1236"
    })).rejects.toBeInstanceOf(AppError);

  });

});
