import {
  AliasModel,
  FundModel,
  GeneralModel,
  ManagerModel,
} from '../models';

export const getToast1 = (): GeneralModel.IToast => ({
  message: 'tosat',
  type: GeneralModel.ToastType.SUCCESS,
  id: 12983213,
});

export const getFundRequest1 = (): FundModel.IFundRequest => ({
  name: 'test',
  start_year: '2023/10/10',
  alias: ['alias 1', 'alias 2'],
  manager: '1'
});

export const getFundManager = (): ManagerModel.IManager => ({
  id: 1,
  name: 'manager test',
  email: 'manager@test.com'
});

export const getAlias1 = (): AliasModel.IAlias => ({
  id: 1,
  alias: 'alias 1'
});

export const getAlias2 = (): AliasModel.IAlias => ({
  id: 2,
  alias: 'alias 2'
});

export const getFund1 = (): FundModel.IFund => ({
  id: 1,
  name: 'test',
  start_year: '2023/10/10',
  fundalias_set: [getAlias1(), getAlias2()],
  is_duplicated: false,
  manager: getFundManager(),
  created_at: new Date()
});
