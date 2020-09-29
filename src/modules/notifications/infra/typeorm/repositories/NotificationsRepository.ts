import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import { getMongoRepository, MongoRepository } from "typeorm";
import Notification from "../schemas/Notification";

export default class NotificationsRepository implements INotificationsRepository{
  private ormNotification: MongoRepository<Notification>;

  constructor(){
    this.ormNotification = getMongoRepository(Notification, 'mongo');
  }

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormNotification.create({
      content,
      recipient_id,
    });
    await this.ormNotification.save(notification);

    return notification;
  }
}
