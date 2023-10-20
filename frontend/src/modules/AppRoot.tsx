import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'

import { ROUTES } from "../constants";
import { queryClient } from "./hooks/useQuery";

import Home from "./views/pages/Home";

const AppRoot = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME.path} element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppRoot;
