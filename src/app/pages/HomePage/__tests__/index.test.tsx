import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { HomePage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();

function* mockHomePageSaga() {}

jest.mock('../saga', () => ({
  homePageSaga: mockHomePageSaga,
}));

const renderHomPage = (store: Store) =>
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );

describe('Homepage should show cars', () => {
  let component: ReturnType<typeof renderHomPage>;

  beforeEach(() => {
    component = renderHomPage(store);
  });

  afterEach(() => {
    component.unmount();
  });

  it('Displays Home to render', () => {
    component = renderHomPage(store);
  });
});
