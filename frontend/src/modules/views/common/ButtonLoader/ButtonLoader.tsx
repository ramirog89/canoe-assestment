import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

import { styles } from "./style";

export type IButtonLoaderProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: any;
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
} & LoadingButtonProps;

const ButtonLoader = ({
  label,
  isLoading = false,
  disabled = false,
  style = {},
  startIcon = null,
  endIcon = null,
  ...props
}: IButtonLoaderProps) => {
  return (
    <LoadingButton
      variant="contained"
      style={styles.container}
      sx={{ ":disabled": { color: "white" }, ...style }}
      loading={isLoading}
      disabled={disabled || isLoading}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {label}
    </LoadingButton>
  );
};

export default ButtonLoader;
