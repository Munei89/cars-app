import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { cars } from 'utils/constants';
import CardListing from '../CardListing';
import { ICar } from 'app/pages/HomePage/types';

describe('CardListing component should render', () => {
  it('Displays CardListing', () => {
    render(
      <CardListing
        cars={cars}
        handleBookCar={function (car: ICar): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(screen.getByTestId('listings')).toBeInTheDocument();
  });
  it('Displays Car list', async () => {
    render(
      <CardListing
        cars={cars}
        handleBookCar={function (car: ICar): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const list = await screen.getAllByTestId('car-list');
    expect(list.length).toBeGreaterThan(0);
  });
});
