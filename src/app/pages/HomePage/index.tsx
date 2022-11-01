import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DefaultLayout from 'app/layouts/DefaultLayout';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { actions, reducer, sliceKey } from './slice';
import { homePageSaga } from './saga';
import { selectHomePage } from './selectors';

import StyledCard from 'app/components/StyledCard';

export function HomePage() {
  const dispatch = useDispatch();

  const cars = [
    {
      id: 1,
      car: 'Mitsubishi',
      car_model: 'Montero',
      car_color: 'Yellow',
      car_model_year: 2002,
      car_vin: 'SAJWJ0FF3F8321657',
      price: '$2814.46',
      availability: false,
    },
    {
      id: 2,
      car: 'Volkswagen',
      car_model: 'Passat',
      car_color: 'Maroon',
      car_model_year: 2008,
      car_vin: 'WBANV9C51AC203320',
      price: '$1731.98',
      availability: false,
    },
    {
      id: 3,
      car: 'Saturn',
      car_model: 'L-Series',
      car_color: 'Red',
      car_model_year: 2003,
      car_vin: '1HGCR6F34EA246317',
      price: '$2238.35',
      availability: true,
    },
    {
      id: 4,
      car: 'Jeep',
      car_model: 'Compass',
      car_color: 'Violet',
      car_model_year: 2012,
      car_vin: '4USBT33454L511606',
      price: '$2732.99',
      availability: false,
    },
    {
      id: 5,
      car: 'Mitsubishi',
      car_model: 'Lancer Evolution',
      car_color: 'Purple',
      car_model_year: 2002,
      car_vin: 'WAU2GBFCXDN339713',
      price: '$3849.47',
      availability: false,
    },
    {
      id: 6,
      car: 'Chevrolet',
      car_model: 'Suburban',
      car_color: 'Indigo',
      car_model_year: 2009,
      car_vin: 'WAUSH98E96A592763',
      price: '$1252.30',
      availability: false,
    },
    {
      id: 7,
      car: 'Dodge',
      car_model: 'Ram Van B350',
      car_color: 'Yellow',
      car_model_year: 1994,
      car_vin: 'KNADH4A37A6919967',
      price: '$1762.42',
      availability: true,
    },
    {
      id: 8,
      car: 'Isuzu',
      car_model: 'Ascender',
      car_color: 'Teal',
      car_model_year: 2004,
      car_vin: '5GTMNGEE8A8713093',
      price: '$1081.40',
      availability: true,
    },
    {
      id: 9,
      car: 'BMW',
      car_model: '6 Series',
      car_color: 'Purple',
      car_model_year: 2008,
      car_vin: '5TDBY5G16DS675822',
      price: '$1258.99',
      availability: true,
    },
    {
      id: 10,
      car: 'Mitsubishi',
      car_model: 'GTO',
      car_color: 'Purple',
      car_model_year: 1994,
      car_vin: 'JM1NC2PFXE0140518',
      price: '$3822.92',
      availability: false,
    },
    {
      id: 11,
      car: 'Mazda',
      car_model: 'Mazda5',
      car_color: 'Red',
      car_model_year: 2010,
      car_vin: 'WAUNE78P18A342660',
      price: '$3963.20',
      availability: true,
    },
    {
      id: 12,
      car: 'Audi',
      car_model: 'Q7',
      car_color: 'Pink',
      car_model_year: 2012,
      car_vin: 'WA1WYBFE2AD448505',
      price: '$1144.27',
      availability: true,
    },
    {
      id: 13,
      car: 'Mercedes-Benz',
      car_model: 'SL-Class',
      car_color: 'Aquamarine',
      car_model_year: 1989,
      car_vin: '4A4AP3AU8FE713946',
      price: '$1386.49',
      availability: true,
    },
    {
      id: 14,
      car: 'Volvo',
      car_model: 'C70',
      car_color: 'Red',
      car_model_year: 2012,
      car_vin: 'WAUHGBFC9DN768366',
      price: '$1366.96',
      availability: true,
    },
    {
      id: 15,
      car: 'GMC',
      car_model: 'Envoy XL',
      car_color: 'Green',
      car_model_year: 2006,
      car_vin: 'WA1AV74L67D649365',
      price: '$1221.46',
      availability: false,
    },
    {
      id: 16,
      car: 'GMC',
      car_model: 'Vandura G3500',
      car_color: 'Teal',
      car_model_year: 1996,
      car_vin: '1FMJK2A5XAE576485',
      price: '$1877.63',
      availability: true,
    },
  ];

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const homePageState = useSelector(selectHomePage);

  React.useEffect(() => {
    dispatch(actions.getCars());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      {homePageState.loading && <div>Loading...</div>}
      <Grid item xs={8}>
        <Grid container spacing={2}>
          {cars.length > 0 &&
            cars.map(car => (
              <Grid item xs={4}>
                <StyledCard key={car.id}>
                  <h1>{car.car}</h1>
                  <p>
                    {car.car_model} - {car.car_model_year} - {car.car_color}
                  </p>

                  <Chip label={car.availability ? 'Available' : 'Booked'} />
                </StyledCard>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
