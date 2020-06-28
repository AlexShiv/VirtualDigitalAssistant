export interface IStatPopularCategories {
  id?: number;
  nameCategory?: string;
  countAnswers?: number;
}

export class StatPopularCategories implements IStatPopularCategories {
  constructor(public id?: number, public nameCategory?: string, public countAnswers?: number) {}
}
