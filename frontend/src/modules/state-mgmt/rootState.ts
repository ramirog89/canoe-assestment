import React from 'react';

export interface IProviderProps<T> {
  children: React.ReactNode;
  initialState: T;
}
