import * as React from 'react';
import DefaultLayout from 'app/layouts/DefaultLayout';
import Grid from '@mui/material/Grid';
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
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';

import StyledButton from 'app/components/StyledButton';

import CarListing from './components/CarListing';
import Bookings from './components/Bookings';

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

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const homePageState = useSelector(selectHomePage);

  React.useEffect(() => {
    dispatch(actions.getCars());
    dispatch(actions.getBookings());
  }, [dispatch]);

  const handleBookCar = car => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleBook = carId => {
    const carDetail = homePageState.cars.find(car => car.id === carId);

    const booking = {
      ...carDetail,
      start_date: moment(values.start_date).format('YYYY-MM-DD'),
      end_date: moment(values.end_date).format('YYYY-MM-DD'),
      updated_at: moment().format('YYYY-MM-DD'),
      created_at: moment().format('YYYY-MM-DD'),
    };
    dispatch(actions.bookCarSuccess(booking));
    setOpen(false);
  };

  const handleFilter = filters => {
    dispatch(
      actions.getBookingsSuccess(
        homePageState.bookings.data.filter(obj => {
          return (
            new Date(obj.created_at.substring(0, 19)).getTime() >=
              new Date(filters.fromDate).getTime() &&
            new Date(obj.created_at.substring(0, 19)).getTime() <=
              new Date(filters.toDate).getTime()
          );
        }),
      ),
    );
  };

  const handleCancelFilter = () => {
    dispatch(actions.getBookings());
  };

  return (
    <DefaultLayout>
      <Grid item xs={12} md={8} lg={8} role="grid">
        {homePageState.loading ? (
          <CircularProgress />
        ) : (
          <CarListing cars={homePageState.cars} handleBookCar={handleBookCar} />
        )}
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Bookings
          bookings={homePageState.bookings.data}
          handleFilter={handleFilter}
          handleCancelFilter={handleCancelFilter}
        />
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
