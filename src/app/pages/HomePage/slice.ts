import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { HomePageState, ICar, IBooking } from './types';

export const initialState: HomePageState = {
  cars: [],
  loading: false,
  error: false,
  bookings: {
    loading: false,
    error: false,
    data: [],
  },
};

const homePageSlice = createSlice({
  // @ts-ignore TODO: fix this
  name: 'homePage',
  initialState,
  reducers: {
    getCars(state) {
      state.loading = true;
      state.error = false;
    },
    getCarsSuccess(state, action: PayloadAction<ICar[]>) {
      state.cars = action.payload;
      state.loading = false;
    },
    getCarsError(state) {
      state.loading = false;
      state.error = true;
    },
    getBookings(state) {
      state.bookings.loading = true;
      state.bookings.error = false;
    },
    getBookingsSuccess(state, action: PayloadAction<IBooking[]>) {
      state.bookings.data = action.payload;
      state.bookings.loading = false;
    },
    getBookingsError(state) {
      state.bookings.loading = false;
      state.bookings.error = true;
    },
    bookCar(state) {
      state.bookings.loading = true;
      state.bookings.error = false;
    },
    bookCarSuccess(state, action: PayloadAction<any>) {
      state.bookings.data = [...state.bookings.data, action.payload];
      state.bookings.loading = false;
    },
    showAvailableCars(state) {
      const availableCars = state.cars.filter(car => car.availability);
      state.cars = availableCars;
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
