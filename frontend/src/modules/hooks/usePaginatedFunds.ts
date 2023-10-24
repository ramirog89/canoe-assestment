import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useApi } from './useApi';

export const usePaginatedFunds = () => {
  const apiManager = useApi();
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const funds = useQuery({
    queryKey: ['funds', page, rowsPerPage],
    queryFn: () => apiManager.getFunds({ page, size: rowsPerPage }),
    enabled: false
  });

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  }

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  React.useEffect(() => {
    funds.refetch();
  }, [page, rowsPerPage]);  // eslint-disable-line

  return { funds, page, rowsPerPage, onChangePage, onChangeRowsPerPage };
}