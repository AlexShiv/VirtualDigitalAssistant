import { Moment } from 'moment';
import { IForms } from 'app/shared/model/forms.model';
import { IEventTypes } from 'app/shared/model/event-types.model';
import { IClients } from 'app/shared/model/clients.model';

export interface IEvents {
  id?: number;
  nameEvent?: string;
  description?: string;
  beginDate?: Moment;
  endDate?: Moment;
  forms?: IForms[];
  eventTypes?: IEventTypes;
  client?: IClients;
}

export class Events implements IEvents {
  constructor(
    public id?: number,
    public nameEvent?: string,
    public description?: string,
    public beginDate?: Moment,
    public endDate?: Moment,
    public forms?: IForms[],
    public eventTypes?: IEventTypes,
    public client?: IClients
  ) {}
}
