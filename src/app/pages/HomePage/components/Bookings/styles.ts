import styles from 'styled-components/macro';

export const StyledBookings = styles.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: -10px;
`;

export const StyledHeadingWrapper = styles.div`
  display: flex;
  justify-content: space-between;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 0px;
  }
  svg {
    margin-top: 0px;
    cursor: pointer;
  }
`;
