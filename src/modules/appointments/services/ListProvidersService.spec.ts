import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  })

  it('should be able to lit the providers ', async () => {
    const user1 = await fakeUsersRepository.create({
      email: "fulano@gmail.com",
      name: "fulano",
      password: "123456"
    });

    const user2 = await fakeUsersRepository.create({
      email: "fulano2@gmail.com",
      name: "fulano2",
      password: "123456"
    });

    const loggedUser = await fakeUsersRepository.create({
      email: "user@gmail.com",
      name: "user",
      password: "123456"
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1,user2,]);

  });
});
