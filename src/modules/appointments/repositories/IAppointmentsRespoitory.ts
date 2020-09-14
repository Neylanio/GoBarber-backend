import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRespository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
