import React from 'react';

import { ComposeProvider, Provider } from './compose';
import { GeneralProvider } from './general';

export const providers: Provider[] = [GeneralProvider];

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  return <ComposeProvider providers={providers}>{children}</ComposeProvider>;
};
