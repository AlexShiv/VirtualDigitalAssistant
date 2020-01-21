import { Moment } from 'moment';
import { IEvents } from 'app/shared/model/events.model';
import { IClients } from 'app/shared/model/clients.model';

export interface IForms {
  id?: number;
  createDate?: Moment;
  event?: IEvents;
  client?: IClients;
}

export class Forms implements IForms {
  constructor(public id?: number, public createDate?: Moment, public event?: IEvents, public client?: IClients) {}
}
