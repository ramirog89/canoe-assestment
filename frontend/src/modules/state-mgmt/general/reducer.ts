import {ActionType} from './actions';
import {IState} from './state';
import {GeneralModel} from '../../../models';

export const reducer = (
  state: IState,
  action: GeneralModel.IAction<ActionType>,
) => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {...state, toastList: [...state.toastList, action.payload.toast]};
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toastList: state.toastList.filter(
          toast => action.payload.id !== toast.id,
        ),
      };
    case ActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };
    default:
      return state;
  }
};
