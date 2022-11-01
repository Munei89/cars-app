import Endpoints from 'config/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { actions } from './slice';

export function* getCars() {
  const { getAll } = Endpoints.cars;
  try {
    const cars = yield call(request.get, getAll);
    yield put(actions.getCarsSuccess(cars.cars));
  } catch (err) {
    yield put(actions.getCarsError());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.getCars.type, getCars);
}
