import { useMutation, useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';
import { FundModel } from '../../models';

export const useFunds = () => {
  const apiManager = useApi();

  const funds = useQuery({
    queryKey: ['funds'],
    queryFn: () => apiManager.getFunds(),
  });

  const create = useMutation({
    mutationFn: (payload: FundModel.IFundRequest) => apiManager.createFund(payload)
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FundModel.IFundRequest; }) => apiManager.updateFund(id, payload)
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiManager.deleteFund(id)
  })

  return { funds, create, update, remove };
};
