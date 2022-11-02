import React from 'react';
import Grid from '@mui/material/Grid';
import StyledButton from 'app/components/StyledButton';
import StyledCard from 'app/components/StyledCard';
import { ICar } from '../../types';
import { StyledIcon, StyledChip, StyledHeading, StyledText } from './styles';

interface IProps {
  cars: ICar[];
  handleBookCar: (car: ICar) => void;
}

const CarListing = ({ cars, handleBookCar }: IProps) => {
  return (
    <Grid container spacing={2}>
      {cars.length > 0 &&
        cars.map(car => (
          <Grid item xs={12} md={4} lg={4} key={car.id}>
            <StyledCard>
              <StyledIcon className={`car-${car.car.toLocaleLowerCase()}`} />
              <StyledChip
                $isBooked={car.availability}
                label={car.availability ? 'Available' : 'Booked'}
              />

              <StyledHeading>{car.car}</StyledHeading>
              <StyledText>Model: {car.car_model}</StyledText>
              <StyledText>Year: {car.car_model_year}</StyledText>
              <StyledText>
                <StyledText>Color: {car.car_color}</StyledText>
                <StyledText></StyledText>
                Price: {car.price}
              </StyledText>
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
                Book
              </StyledButton>
            </StyledCard>
          </Grid>
        ))}
    </Grid>
  );
};

export default CarListing;
