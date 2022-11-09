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
import i18next from 'i18next';

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
              sm={12}
              md={4}
              lg={4}
              key={car.id}
              data-testid="car-list"
            >
              <StyledCard>
                <StyledIcon className={`car-${car.car.toLocaleLowerCase()}`} />
                <StyledChip
                  $isBooked={car.availability}
                  label={
                    car.availability
                      ? `${i18next.t('AVAILABLE') as string}`
                      : `${i18next.t('BOOKED') as string}`
                  }
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <StyledHeading>{car.car}</StyledHeading>
                    <StyledText>
                      {i18next.t('MODEL') as string}: {car.car_model}
                    </StyledText>
                    <StyledText>
                      {i18next.t('YEAR') as string}: {car.car_model_year}
                    </StyledText>
                    <StyledText>
                      {i18next.t('PRICE') as string}: {car.price}
                    </StyledText>
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
                  {car.availability
                    ? `${i18next.t('BOOK')}`
                    : `${i18next.t('BOOKED')}`}
                </StyledButton>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <StyledHeading>
              {i18next.t('NO_CARS_AVAILABLE') as string}
            </StyledHeading>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        sx={{
          marginTop: '40px',
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={4}>
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
