import { IClients } from 'app/shared/model/clients.model';

export interface IRoles {
  id?: number;
  nameRole?: string;
  clients?: IClients[];
}

export class Roles implements IRoles {
  constructor(public id?: number, public nameRole?: string, public clients?: IClients[]) {}
}
