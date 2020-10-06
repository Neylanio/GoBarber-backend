import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {

    //Pra marcar o appointment o cara precisa estar logado

    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id: request.user.id,
      date,
    });
    return response.json(appointment);
  }
}
