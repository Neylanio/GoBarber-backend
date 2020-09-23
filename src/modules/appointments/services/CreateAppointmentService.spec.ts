import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  it('should not be able to create two appointments at the same time', async() => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    })

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });
});
