import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg"
    })

    expect(user.avatar).toBe('avatar.jpg');

  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFileName: "avatar.jpg"
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should delete old avatar when updating new one', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg"
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar2.jpg"
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');

  });
});
