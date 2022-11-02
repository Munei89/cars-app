import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import StyledButton from 'app/components/StyledButton';
import StyledCard from 'app/components/StyledCard';
import { ICar } from '../../types';
import { StyledIcon, StyledChip, StyledHeading, StyledText } from './styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Pagination from '@mui/material/Pagination';
import usePagination from 'utils/hooks/usePagination';

interface IProps {
  cars: ICar[];
  handleBookCar: (car: ICar) => void;
}

const CarListing = ({ cars, handleBookCar }: IProps) => {
  let [page, setPage] = React.useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(cars.length / PER_PAGE);
  const _DATA = usePagination(cars, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <>
      <Grid container spacing={2} data-testid="listings">
        {cars.length > 0 ? (
          _DATA.currentData().map(car => (
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              key={car.id}
              data-testid="car-list"
            >
              <StyledCard>
                <StyledIcon className={`car-${car.car.toLocaleLowerCase()}`} />
                <StyledChip
                  $isBooked={car.availability}
                  label={car.availability ? 'Available' : 'Booked'}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <StyledHeading>{car.car}</StyledHeading>
                    <StyledText>Model: {car.car_model}</StyledText>
                    <StyledText>Year: {car.car_model_year}</StyledText>
                    <StyledText>Price: {car.price}</StyledText>
                  </div>
                  <div>
                    <DirectionsCarIcon
                      sx={{
                        fill: `${car.car_color}`,
                        fontSize: '5rem',
                      }}
                    />
                  </div>
                </Box>
                <StyledButton
                  variant="contained"
                  color="primary"
                  disabled={!car.availability}
                  sx={{
                    mt: 2,
                  }}
                  onClick={() => {
                    handleBookCar(car);
                  }}
                >
                  {car.availability ? 'Book' : 'Booked'}
                </StyledButton>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} md={4} lg={4}>
            <StyledHeading>No cars available</StyledHeading>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        sx={{
          marginTop: '40px',
        }}
      >
        <Grid item xs={12} md={4} lg={4}>
          <Pagination
            count={count}
            onChange={handleChange}
            page={page}
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CarListing;
