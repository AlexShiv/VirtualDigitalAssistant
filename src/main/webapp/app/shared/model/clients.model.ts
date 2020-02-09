import { IForms } from 'app/shared/model/forms.model';
import { IGroups } from 'app/shared/model/groups.model';
import { IRoles } from 'app/shared/model/roles.model';

export interface IClients {
  id?: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  phone?: string;
  forms?: IForms[];
  groups?: IGroups;
  role?: IRoles;
}

export class Clients implements IClients {
  constructor(
    public id?: number,
    public surname?: string,
    public name?: string,
    public patronymic?: string,
    public phone?: string,
    public forms?: IForms[],
    public groups?: IGroups,
    public role?: IRoles
  ) {}
}
