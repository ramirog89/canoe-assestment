import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from "../constants";
import { ContextMock } from './ContextMock';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (children: React.ReactNode, state?: { [key: string]: { initialState: any } }) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ContextMock state={state}>
          {children}
        </ContextMock>
      </ThemeProvider>
    </QueryClientProvider>
  )
};

export { customRender as render };
export * from '@testing-library/react';
