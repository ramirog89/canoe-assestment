import { reducer } from './reducer';
import { ActionType } from './actions';
import { initialState } from './state';

import { getToast1 } from '../../../test/entities';

describe('general reducer', () => {
  it('should return state without mutation when no switch case match', () => {
    expect(reducer(initialState, {type: null, payload: null})).toBe(
      initialState,
    );
  });

  it('should return new state on general ActionType.ADD_TOAST', () => {
    expect(
      reducer(initialState, {
        type: ActionType.ADD_TOAST,
        payload: {toast: {...getToast1(), id: 1}},
      }),
    ).toEqual({
      ...initialState,
      toastList: [
        {
          ...getToast1(),
          id: 1,
        },
      ],
    });
  });

  it('should return new state on general ActionType.REMOVE_TOAST', () => {
    const toastInitialState = {
      ...initialState,
      toastList: [
        {
          id: 1,
          toast: getToast1(),
        },
      ],
    } as any;
    expect(
      reducer(toastInitialState, {
        type: ActionType.REMOVE_TOAST,
        payload: {id: 1},
      }),
    ).toEqual({
      ...initialState,
      toastList: [],
    });
  });
});
