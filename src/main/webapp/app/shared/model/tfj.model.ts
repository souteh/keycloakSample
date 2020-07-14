import { Moment } from 'moment';

export interface ITfj {
  id?: number;
  idtfj?: number;
  datetfj?: Moment;
  statuttfj?: string;
}

export class Tfj implements ITfj {
  constructor(public id?: number, public idtfj?: number, public datetfj?: Moment, public statuttfj?: string) {}
}
