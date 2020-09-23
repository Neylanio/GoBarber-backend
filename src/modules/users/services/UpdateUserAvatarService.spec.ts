import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })

  it('should be able to update avatar', async () => {
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
    await fakeUsersRepository.create({
      email: "neylanio@gmail.com",
      name: "Neylanio",
      password: "123456"
    })

    await expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFileName: "avatar.jpg"
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should delete old avatar when updating new one', async () => {
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
