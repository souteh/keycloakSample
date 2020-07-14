export interface IEtapeparam {
  id?: number;
  idetapeparam?: number;
  libelleetapeparam?: string;
  codeetapeparam?: string;
}

export class Etapeparam implements IEtapeparam {
  constructor(public id?: number, public idetapeparam?: number, public libelleetapeparam?: string, public codeetapeparam?: string) {}
}
