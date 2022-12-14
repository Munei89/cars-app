import React from 'react';
import { StyledBtn } from './styles';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  sx?: any;
}

const StyledButton = ({
  children,
  onClick,
  variant,
  color,
  size,
  disabled,
  startIcon,
  endIcon,
  fullWidth,
  ...rest
}: Props) => {
  return (
    <StyledBtn
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledBtn>
  );
};

export default StyledButton;
