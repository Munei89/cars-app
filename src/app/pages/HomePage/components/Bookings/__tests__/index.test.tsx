import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { carBookings } from 'utils/constants';
import Bookings from '../Bookings';

describe('Bookings component should render', () => {
  it('Displays Bookings', () => {
    render(
      <Bookings
        handleFilter={function (filters: any): void {
          throw new Error('Function not implemented.');
        }}
        handleCancelFilter={function (): void {
          throw new Error('Function not implemented.');
        }}
        bookings={carBookings}
      />,
    );
    expect(screen.getByTestId('bookings')).toBeInTheDocument();
  });
  it('Displays Bookings list', async () => {
    render(
      <Bookings
        handleFilter={function (filters: any): void {
          throw new Error('Function not implemented.');
        }}
        handleCancelFilter={function (): void {
          throw new Error('Function not implemented.');
        }}
        bookings={carBookings}
      />,
    );
    const list = await screen.getAllByTestId('booking-list');
    expect(list.length).toBeGreaterThan(0);
  });
});
