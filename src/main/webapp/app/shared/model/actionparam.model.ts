import { IEtapeparam } from 'app/shared/model/etapeparam.model';

export interface IActionparam {
  id?: number;
  idactionparam?: number;
  libelleactionparam?: string;
  codeactionparam?: string;
  idetapeparam?: IEtapeparam;
}

export class Actionparam implements IActionparam {
  constructor(
    public id?: number,
    public idactionparam?: number,
    public libelleactionparam?: string,
    public codeactionparam?: string,
    public idetapeparam?: IEtapeparam
  ) {}
}
