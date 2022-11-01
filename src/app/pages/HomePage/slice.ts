import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { HomePageState, ICar } from './types';

export const initialState: HomePageState = {
  cars: [],
  loading: false,
  error: false,
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
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
