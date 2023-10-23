import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

import { ROUTES, theme } from "../constants";
import { ContextProvider } from "./state-mgmt/provider";
import { queryClient } from "./hooks/useQuery";

import ToastList from "./views/common/ToastList";
import Home from "./views/pages/Home";

const AppRoot = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.HOME.path} element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
          <ToastList />
        </ContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppRoot;
