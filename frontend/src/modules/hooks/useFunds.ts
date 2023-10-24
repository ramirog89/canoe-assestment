import * as React from 'react';
import { useMutation } from '@tanstack/react-query';

import { FundModel, GeneralModel } from '../../models';
import { useGeneral } from '../state-mgmt/general';
import { useApi } from './useApi';

export const useFunds = () => {
  const apiManager = useApi();
  const generalManager = useGeneral();

  const create = useMutation({
    mutationFn: (payload: FundModel.IFundRequest) => apiManager.createFund(payload)
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FundModel.IFundRequest; }) => apiManager.updateFund(id, payload)
  });

  const remove = useMutation({
    mutationFn: ({ id }: { id: number }) => apiManager.deleteFund(id)
  });

  React.useEffect(() => {
    if (update.isSuccess) {
      generalManager.addToast({
        message: 'Fund Updated Successfully',
        type: GeneralModel.ToastType.SUCCESS
      });
    } else if (update.isError) {
      generalManager.addToast({
        message: update.error.message,
        type: GeneralModel.ToastType.ERROR
      });
    }
  }, [update.isSuccess, update.isError, update.error]); // eslint-disable-line

  React.useEffect(() => {
    if (create.isSuccess) {
      generalManager.addToast({
        message: 'Fund Created Successfully',
        type: GeneralModel.ToastType.SUCCESS
      });
    } else if (create.isError) {
      generalManager.addToast({
        message: create.error.message,
        type: GeneralModel.ToastType.ERROR
      });
    }
  }, [create.isSuccess, create.isError, create.error]); // eslint-disable-line

  React.useEffect(() => {
    if (remove.isSuccess) {
      generalManager.addToast({
        message: 'Fund Deleted Successfully',
        type: GeneralModel.ToastType.SUCCESS
      });
    } else if (remove.isError) {
      generalManager.addToast({
        message: remove.error.message,
        type: GeneralModel.ToastType.ERROR
      });
    }
  }, [remove.isSuccess, remove.isError, remove.error]); // eslint-disable-line

  return { create, update, remove };
};
