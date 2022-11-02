import { put, takeLatest } from 'redux-saga/effects';
import { carBookings, cars } from 'utils/constants';
import { actions } from './slice';

export function* getCars() {
  try {
    yield put(actions.getCarsSuccess(cars));
  } catch (err) {
    yield put(actions.getCarsError());
  }
}

export function* getBookings() {
  try {
    yield put(actions.getBookingsSuccess(carBookings));
  } catch (err) {
    yield put(actions.getBookingsError());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.getCars.type, getCars);
  yield takeLatest(actions.getBookings.type, getBookings);
}
