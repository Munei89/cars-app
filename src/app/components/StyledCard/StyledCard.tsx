import { StyledCardItem } from './styles';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const StyledCard = ({ children }: Props) => {
  return (
    <StyledCardItem
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </StyledCardItem>
  );
};

export default StyledCard;
