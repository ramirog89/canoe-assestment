import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export const useFundManagers = () => {
  const apiManager = useApi();
  return useQuery({
    queryKey: ['managers'],
    queryFn: () => apiManager.getManagers(),
    staleTime: Infinity
  });
};
