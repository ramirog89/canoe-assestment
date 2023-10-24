import * as React from 'react';

import Dialog from '../../common/Dialog';
import FundForm from './FundForm';

import { FundModel } from '../../../../models';
import { useFunds } from '../../../hooks/useFunds';

interface IFundCardProps {
  id: number;
  items: FundModel.IFund[];
  type: 'create' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const FundCard = ({ id, items, type, isOpen, onClose, onSubmit }: IFundCardProps) => {
  const fundManager = useFunds();

  const [state, setState] = React.useState<FundModel.IFundRequest>(FundModel.getFundRequestFallback());

  const onChangeHandler = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const onConfirm = () => {
    if (type === 'create') {
      fundManager.create.mutate(state);
    } else {
      fundManager.update.mutate({ id, payload: state });
    }
  }

  const isLoading = fundManager.create.isPending || fundManager.update.isPending;

  React.useEffect(() => {
    if (fundManager.create.isSuccess || fundManager.update.isSuccess) {
      setState(FundModel.getFundRequestFallback());
      onSubmit();
    }
  }, [fundManager.create.isSuccess, fundManager.update.isSuccess]); // eslint-disable-line

  React.useEffect(() => {
    if (id && items) {
      const selectedFund = items.find((fund) => fund.id === id) as any;
      setState({
        name: selectedFund?.name,
        start_year: selectedFund?.start_year,
        alias: selectedFund?.fundalias_set.map((a: any) => a.alias),
        manager: selectedFund.manager.id,
      });
    }
  }, [items, id]); // eslint-disable-line

  return (
    <Dialog
      isOpen={isOpen}
      isLoading={isLoading}
      title={FundModel.modalMap[type]?.title}
      closeLabel={FundModel.modalMap[type]?.closeLabel}
      submitLabel={FundModel.modalMap[type]?.submitLabel}
      onClose={onClose}
      onConfirm={onConfirm}
      render={() => (
        <FundForm
          fund={state}
          onChange={onChangeHandler}
        />
      )}
    />
  );
};

export default FundCard;
