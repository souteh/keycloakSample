import { ITfj } from 'app/shared/model/tfj.model';

export interface IEtape {
  id?: number;
  idetape?: number;
  libelleetape?: string;
  statutetape?: string;
  heureexecutionetape?: string;
  codeetape?: string;
  idtfj?: ITfj;
}

export class Etape implements IEtape {
  constructor(
    public id?: number,
    public idetape?: number,
    public libelleetape?: string,
    public statutetape?: string,
    public heureexecutionetape?: string,
    public codeetape?: string,
    public idtfj?: ITfj
  ) {}
}
