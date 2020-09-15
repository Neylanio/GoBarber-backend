import { container } from 'tsyringe';

import IAppointmentsRespoitory from '@modules/appointments/repositories/IAppointmentsRespoitory';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRespoitory from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRespoitory>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRespoitory>('UsersRepository', UsersRepository);
