import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DefaultLayout from 'app/layouts/DefaultLayout';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import { cars } from 'utils/constants';

import StyledButton from 'app/components/StyledButton';

import CarListing from './components/CarListing';

export function HomePage() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const [filters, setFilters] = React.useState<any>({
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });
  const handleClose = () => setOpen(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget, 'target');
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

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

  const handleBookCar = car => {
    setSelectedCar(car);
    setOpen(true);
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
  };

  const handleFilter = () => {
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
    setAnchorEl(null);
  };

  const handleCancelFilter = () => {
    dispatch(actions.getBookings());
    setAnchorEl(null);
  };

  return (
    <DefaultLayout>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      {homePageState.loading && <div>Loading...</div>}
      <Grid item xs={8}>
        <CarListing cars={cars} handleBookCar={handleBookCar} />
      </Grid>
      <Grid item xs={4}>
        <h1>
          Bookings{' '}
          <FilterListIcon onClick={handleClick} aria-describedby={id} />
        </h1>
        <Popover
          id={id}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopOverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              p: 2,
            },
          }}
        >
          <h3>Filter bookings by date </h3>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Filter start Date"
              inputFormat="MM/DD/YYYY"
              value={filters.fromDate}
              onChange={e =>
                setFilters({
                  ...filters,
                  fromDate: moment(e).format('MM-DD-YYYY'),
                })
              }
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
              label="Filter end Date"
              inputFormat="MM/DD/YYYY"
              value={filters.toDate}
              onChange={e =>
                setFilters({
                  ...filters,
                  toDate: moment(e).format('MM-DD-YYYY'),
                })
              }
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
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleFilter}
              sx={{
                width: '100%',
                margin: '10px 0',
              }}
            >
              Filter
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleCancelFilter}
              sx={{
                width: '100%',
                margin: '10px 0',
              }}
            >
              Cancel
            </StyledButton>
          </LocalizationProvider>
        </Popover>
        <List>
          {homePageState.bookings.data.length > 0 &&
            homePageState.bookings.data.map(booking => (
              <ListItem
                disabled={!isUpcoming(booking.start_date)}
                key={booking.id}
              >
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
