import { injectable, inject } from "tsyringe";

import IAppointmentsRespoitory from '../repositories/IAppointmentsRespoitory';
import { getHours } from "date-fns";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array <{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRespoitory: IAppointmentsRespoitory,
  ){}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRespoitory.findAllInDayFromProvider({ provider_id, day, month, year });

    const hourStart = 8;

    const eachHourArray = Array.from(
      {length: 10},
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    });

    return availability;
  }
}
