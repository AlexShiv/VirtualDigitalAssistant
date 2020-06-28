export interface IStatCorrectAnswers {
  id?: number;
  nameCriteria?: string;
  countResult?: number;
}

export class StatCorrectAnswers implements IStatCorrectAnswers {
  constructor(public id?: number, public nameCriteria?: string, public countResult?: number) {}
}
