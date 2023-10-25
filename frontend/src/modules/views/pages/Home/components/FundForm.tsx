import * as React from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { FundModel } from '../../../../../models';
import { useFundManagers } from '../../../../hooks/useFundManagers';

interface IFundCardProps {
  fund: FundModel.IFundRequest;
  onChange: (event: any) => void;
}

const FundCard = ({
  fund,
  onChange,
}: IFundCardProps) => {
  const fundManagerManager = useFundManagers();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack
        sx={{
          width: '100%',
          minWidth: { xs: '300px', sm: '360px', md: '400px' },
          gap: '1.5rem',
          padding: '.5rem'
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={fund.name}
          onChange={onChange}
        />
        <TextField
          label="Start Year"
          name="start_year"
          value={fund.start_year}
          type="date"
          onChange={onChange}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Managers</InputLabel>
          <Select
            label="Manager"
            name="manager"
            value={fund.manager}
            onChange={onChange}
          >
            {fundManagerManager.data?.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          clearIcon={false}
          options={[]}
          freeSolo={true}
          multiple={true}
          value={fund.alias}
          onChange={(event, value) => onChange({ target: { name: 'alias', value: value } })}
          renderTags={(value, props) => Object.values(value)
            .map((v) => ({ id: null, label: v }))
            .map((option: any, index) => (
              <Chip label={option.label} {...props({ index })} />
            ))
          }
          renderInput={(params) => <TextField label="Aliases" {...params} />}
        />
      </Stack>
    </form>
  );
};

export default FundCard;
