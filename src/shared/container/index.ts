import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRespoitory from '@modules/appointments/repositories/IAppointmentsRespoitory';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRespoitory from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRespoitory from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRespoitory>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRespoitory>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRespoitory>('UserTokensRepository', UserTokensRepository);
