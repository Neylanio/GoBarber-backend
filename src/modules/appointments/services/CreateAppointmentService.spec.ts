import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository);
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      user_id: 'edefe',
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  it('should not be able to create two appointments at the same time', async() => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 14);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'edefe',
      provider_id: '123123',
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'edefe',
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'edefe',
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      provider_id: 'user_id',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment before at 8 am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user_id',
      provider_id: 'provider_id',
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user_id',
      provider_id: 'provider_id',
    })).rejects.toBeInstanceOf(AppError);

  });
});
