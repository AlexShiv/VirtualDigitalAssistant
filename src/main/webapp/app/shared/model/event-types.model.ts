import { IEvents } from 'app/shared/model/events.model';

export interface IEventTypes {
  id?: number;
  nameEventType?: string;
  events?: IEvents[];
}

export class EventTypes implements IEventTypes {
  constructor(public id?: number, public nameEventType?: string, public events?: IEvents[]) {}
}
