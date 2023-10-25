import { IManager } from './manager';
import { IAlias } from './alias';

export interface IFund {
  id: number;
  name: string;
  start_year: string;
  fundalias_set: IAlias[];
  is_duplicated: boolean;
  manager: IManager;
  created_at: Date;
}

export interface IFundRequest {
  name: string;
  start_year: string;
  alias: string[];
  manager: string;
}

export const getFundRequestFallback = (): IFundRequest => ({
  name: '',
  start_year: '',
  alias: [],
  manager: '',
});


export const modalMap: any = {
  edit: {
    title: 'Edit Fund',
    closeLabel: 'Close',
    submitLabel: 'Edit'
  },
  create: {
    title: 'Create Fund',
    closeLabel: 'Close',
    submitLabel: 'Create'
  }
};