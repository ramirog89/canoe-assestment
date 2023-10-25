import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useApi } from './useApi';

export enum FundFilter {
  ALL = 'all',
  DUPLICATES = 'duplicates'
}

export const usePaginatedFunds = () => {
  const apiManager = useApi();
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [filter, setFilter] = React.useState<FundFilter>(FundFilter.ALL);

  const funds = useQuery({
    queryKey: ['funds', page, rowsPerPage, filter],
    queryFn: () => apiManager.getFunds({ page, size: rowsPerPage, filter }),
    enabled: false
  });

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  }

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const onChangeFilter = (value: any) => {
    setFilter(value);
  }

  React.useEffect(() => {
    funds.refetch();
  }, [page, rowsPerPage, filter]); // eslint-disable-line

  return {
    page,
    funds,
    filter,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    onChangeFilter
  };
}