import { IAction } from 'app/shared/model/action.model';

export interface IMessageerreur {
  id?: number;
  idmessage?: number;
  description?: string;
  idaction?: IAction;
}

export class Messageerreur implements IMessageerreur {
  constructor(public id?: number, public idmessage?: number, public description?: string, public idaction?: IAction) {}
}
