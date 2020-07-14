export interface IStatutenum {
  id?: number;
  idstatut?: number;
  libellestatut?: string;
  codestatut?: string;
}

export class Statutenum implements IStatutenum {
  constructor(public id?: number, public idstatut?: number, public libellestatut?: string, public codestatut?: string) {}
}
