import { Moment } from 'moment';
import { IClients } from 'app/shared/model/clients.model';
import { IForms } from 'app/shared/model/forms.model';
import { IEventTypes } from 'app/shared/model/event-types.model';

export interface IEvents {
  id?: number;
  nameEvent?: string;
  description?: string;
  beginDate?: Moment;
  endDate?: Moment;
  client?: IClients;
  forms?: IForms[];
  eventTypes?: IEventTypes;
}

export class Events implements IEvents {
  constructor(
    public id?: number,
    public nameEvent?: string,
    public description?: string,
    public beginDate?: Moment,
    public endDate?: Moment,
    public client?: IClients,
    public forms?: IForms[],
    public eventTypes?: IEventTypes
  ) {}
}
