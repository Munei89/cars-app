import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DefaultLayout from 'app/layouts/DefaultLayout';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { actions, reducer, sliceKey } from './slice';
import { homePageSaga } from './saga';
import { selectHomePage } from './selectors';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoCrashIcon from '@mui/icons-material/NoCrash';

import StyledCard from 'app/components/StyledCard';
import StyledButton from 'app/components/StyledButton';

export function HomePage() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState({
    id: 0,
    car: '',
    car_model: '',
    car_color: '',
    car_model_year: 0,
    car_vin: '',
    price: '',
    availability: false,
  });

  const [values, setValues] = React.useState({
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
  });
  const handleClose = () => setOpen(false);

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
    dispatch(actions.getBookings());
  }, [dispatch]);

  const isUpcoming = date => {
    const today = new Date();
    const bookingDate = new Date(date);
    return bookingDate > today;
  };

  const handleBook = carId => {
    const carDetail = cars.find(car => car.id === carId);

    const booking = {
      ...carDetail,
      start_date: moment(values.start_date).format('YYYY-MM-DD'),
      end_date: moment(values.end_date).format('YYYY-MM-DD'),
      updated_at: moment().format('YYYY-MM-DD'),
      created_at: moment().format('YYYY-MM-DD'),
    };
    dispatch(actions.bookCarSuccess(booking));
    console.log(booking, 'booking');
  };

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
                  <i className={`car-${car.car.toLocaleLowerCase()}`}></i>
                  <Chip label={car.availability ? 'Available' : 'Booked'} />

                  <h1>{car.car}</h1>
                  <p>
                    {car.car_model} - {car.car_model_year} - {car.car_color}
                  </p>

                  <StyledButton
                    variant="contained"
                    color="primary"
                    disabled={!car.availability}
                    onClick={() => {
                      setSelectedCar(car);
                      setOpen(true);
                    }}
                  >
                    Book
                  </StyledButton>
                </StyledCard>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <h1>Bookings</h1>
        <List>
          {homePageState.bookings.data.length > 0 &&
            homePageState.bookings.data.map(booking => (
              <ListItem disabled={!isUpcoming(booking.start_date)}>
                <ListItemIcon>
                  <NoCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${booking.car} - ${booking.car_model} - ${booking.car_model_year} - ${booking.car_color}`}
                  secondary={`${booking.start_date} - ${booking.end_date}`}
                />
                <Chip
                  label={isUpcoming(booking.start_date) ? 'Upcoming' : 'Past'}
                />
              </ListItem>
            ))}
        </List>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          noValidate
          autoComplete="off"
          component="form"
          sx={{
            p: 2,
          }}
        >
          <h3>Selected car for booking: {selectedCar.car}</h3>
          <TextField
            id="outlined-basic"
            label="Car"
            variant="outlined"
            sx={{
              width: '100%',
              margin: '10px 0',
            }}
            name="car"
            defaultValue={selectedCar.car}
          />
          <TextField
            id="outlined-basic"
            label="Car Model"
            variant="outlined"
            sx={{
              width: '100%',
              margin: '10px 0',
            }}
            name="car_model"
            defaultValue={selectedCar.car_model}
          />
          <TextField
            id="outlined-basic"
            label="Model Year"
            variant="outlined"
            sx={{
              width: '100%',
              margin: '10px 0',
            }}
            name="car_model_year"
            defaultValue={selectedCar.car_model_year}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={values.start_date}
              onChange={e =>
                setValues({
                  ...values,
                  start_date: moment(e).format('MM-DD-YYYY'),
                })
              }
              disablePast={true}
              renderInput={params => (
                <TextField
                  sx={{
                    width: '100%',
                    margin: '10px 0',
                  }}
                  {...params}
                />
              )}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={values.end_date}
              onChange={e =>
                setValues({
                  ...values,
                  end_date: moment(e).format('MM-DD-YYYY'),
                })
              }
              disablePast={true}
              renderInput={params => (
                <TextField
                  sx={{
                    width: '100%',
                    margin: '10px 0',
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleBook(selectedCar.id)}
          >
            Book
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            sx={{
              margin: '10px',
            }}
            onClick={() => {
              setOpen(false);
              setValues({
                start_date: '',
                end_date: '',
              });
            }}
          >
            Cancel
          </StyledButton>
        </Box>
      </Dialog>
    </DefaultLayout>
  );
}
