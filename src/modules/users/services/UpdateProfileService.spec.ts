import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'fulano@gmail.com',
      name: 'fulano'
    })

    expect(updatedUser.email).toBe('fulano@gmail.com');
    expect(updatedUser.name).toBe('fulano');

  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    const user = await fakeUsersRepository.create({
      email: "test@gmail.com",
      name: "Teste",
      password: "123456"
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'neylanio@gmail.com',
      name: 'fulano'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'fulano@gmail.com',
      name: 'fulano',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123');

  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'fulano@gmail.com',
      name: 'fulano',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'fulano@gmail.com',
      name: 'fulano',
      old_password: '123123',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);

  });

});
