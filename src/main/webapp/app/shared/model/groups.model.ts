import { IClients } from 'app/shared/model/clients.model';
import { IFaculties } from 'app/shared/model/faculties.model';

export interface IGroups {
  id?: number;
  nameGroup?: string;
  clients?: IClients[];
  faculty?: IFaculties;
}

export class Groups implements IGroups {
  constructor(public id?: number, public nameGroup?: string, public clients?: IClients[], public faculty?: IFaculties) {}
}
