import styles from 'styled-components/macro';
import Chip from '@mui/material/Chip';

export const StyledIcon = styles.i`
  margin-right: 5px;
  font-size: 4.5rem;
`;

export const StyledChip = styles(Chip)<{ $isBooked?: boolean }>`
  float: right;
  &.MuiChip-root {
    background-color: ${({ $isBooked }) => ($isBooked ? '#4caf50' : '#f44336')};
    color: #fff;
  }
`;

export const StyledHeading = styles.h2`
  margin: 8px 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const StyledText = styles.p`
  margin: 2px 0;
  font-size: 0.8rem;
  font-weight: 400;
`;
