import { IEtape } from 'app/shared/model/etape.model';

export interface IAction {
  id?: number;
  idaction?: number;
  libelleaction?: string;
  statutaction?: string;
  codeaction?: string;
  idetape?: IEtape;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public idaction?: number,
    public libelleaction?: string,
    public statutaction?: string,
    public codeaction?: string,
    public idetape?: IEtape
  ) {}
}
