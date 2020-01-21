import { Moment } from 'moment';

export interface IDocuments {
  id?: number;
  nameDocument?: string;
  content?: string;
  createDate?: Moment;
  changeDate?: Moment;
}

export class Documents implements IDocuments {
  constructor(
    public id?: number,
    public nameDocument?: string,
    public content?: string,
    public createDate?: Moment,
    public changeDate?: Moment
  ) {}
}
