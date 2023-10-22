import {
  useMemo,
  createContext,
  useReducer,
  useContext,
  useCallback,
} from 'react';

import {ENV} from '../../../constants';
import {GeneralModel} from '../../../models';
import {IProviderProps} from '../rootState';
import {IState, initialState} from './state';
import {ActionType} from './actions';
import {reducer} from './reducer';

export const GeneralContext = createContext<{
  state: IState;
  addToast: (todo: GeneralModel.IToast) => void;
  removeToast: (id: number) => void;
  toggleSidebar: () => void;
} | null>(null);

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('GeneralContext is not wrapped with GeneralContext.Provider');
  }
  return context;
};

export const GeneralProvider = (props: IProviderProps<IState>) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...props.initialState,
  });

  const addToast = useCallback(
    (toast: GeneralModel.IToast) => {
      const id = new Date().getTime().toString();
      dispatch({type: ActionType.ADD_TOAST, payload: {toast: {...toast, id}}});
      setTimeout(() => {
        dispatch({type: ActionType.REMOVE_TOAST, payload: {id}});
      }, ENV.TOAST_DELAY);
    },
    [dispatch],
  );

  const removeToast = useCallback(
    (id: number) => {
      dispatch({type: ActionType.REMOVE_TOAST, payload: {id}});
    },
    [dispatch],
  );

  const toggleSidebar = useCallback(
    () => {
      dispatch({type: ActionType.TOGGLE_SIDEBAR, payload: {}});
    },
    [dispatch],
  );

  const value = useMemo(() => ({ state, addToast, removeToast, toggleSidebar }), [state, addToast, removeToast, toggleSidebar]);

  return <GeneralContext.Provider value={value} {...props} />;
};
