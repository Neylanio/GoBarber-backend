import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });

  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      email: "ney@gmail.com",
      name: "neylanio",
      password: "123456"
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPasswordService.execute({
      token,
      password: '123123'
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');

  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {

    const userToken = await fakeUserTokensRepository.generate('non-existing user');

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
