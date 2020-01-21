import { IGroups } from 'app/shared/model/groups.model';
import { ITeachers } from 'app/shared/model/teachers.model';

export interface IFaculties {
  id?: number;
  nameFaculty?: string;
  groups?: IGroups[];
  teachers?: ITeachers[];
}

export class Faculties implements IFaculties {
  constructor(public id?: number, public nameFaculty?: string, public groups?: IGroups[], public teachers?: ITeachers[]) {}
}
