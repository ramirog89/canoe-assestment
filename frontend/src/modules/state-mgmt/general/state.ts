import {GeneralModel} from '../../../models';

export interface IState {
  toastList: GeneralModel.IToast[];
  isSidebarOpen: boolean;
}

export const initialState: IState = {
  toastList: [],
  isSidebarOpen: false,
};
