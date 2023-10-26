import React from 'react';

import {ComposeProvider, Provider} from '../modules/state-mgmt/compose';
import {GeneralProvider} from '../modules/state-mgmt/general/provider';

export const providers: Provider[] = [GeneralProvider];

export const ContextMock = ({
  children,
  state = {}
}: {
  children: React.ReactNode,
  state?: { [key: string]: { initialState: any } }
}) => {
  return (
    <ComposeProvider providers={providers} state={state}>
      {children}
    </ComposeProvider>
  );
};
