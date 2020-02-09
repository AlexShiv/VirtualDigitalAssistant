import { IFaculties } from 'app/shared/model/faculties.model';

export interface ITeachers {
  id?: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  isDecan?: boolean;
  faculties?: IFaculties;
}

export class Teachers implements ITeachers {
  constructor(
    public id?: number,
    public surname?: string,
    public name?: string,
    public patronymic?: string,
    public isDecan?: boolean,
    public faculties?: IFaculties
  ) {
    this.isDecan = this.isDecan || false;
  }
}
