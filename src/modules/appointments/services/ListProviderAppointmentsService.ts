import { injectable, inject } from "tsyringe";
import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRespoitory from '../repositories/IAppointmentsRespoitory';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRespoitory: IAppointmentsRespoitory,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ){}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('asd');
    console.log(cacheData)
    const appointments = await this.appointmentsRespoitory.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    return appointments;
  }
}
