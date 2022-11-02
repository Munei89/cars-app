import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarRentalIcon from '@mui/icons-material/CarRental';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import React from 'react';
import StyledButton from 'app/components/StyledButton';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { IBooking } from '../../types';
import { StyledHeadingWrapper, StyledBookings } from './styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface IProps {
  handleFilter: (filters: any) => void;
  handleCancelFilter: () => void;
  bookings: IBooking[];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Bookings = ({ handleFilter, bookings, handleCancelFilter }: IProps) => {
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = React.useState<any>({
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });

  const today = new Date();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const isUpcoming = date => {
    const today = new Date();
    const bookingDate = new Date(date);
    console.log('today', today);
    console.log('bookingDate', bookingDate);
    return bookingDate > today;
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const onFilterSubmit = () => {
    const { fromDate, toDate } = filters;
    if (new Date(fromDate) > new Date(toDate)) {
      setError(true);
      setErrMessage('From date cannot be greater than to date');
      return;
    }
    setError(false);
    setErrMessage('');
    handleFilter(filters);
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <StyledBookings>
      <StyledHeadingWrapper>
        <h1>Bookings</h1>
        <FilterListIcon onClick={handleClick} aria-describedby={id} />
      </StyledHeadingWrapper>
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
            maxDate={today.setDate(today.getDate() - 1)}
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
            onClick={onFilterSubmit}
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
            onClick={() => {
              handleCancelFilter();
              setAnchorEl(null);
            }}
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
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <ListItem
              disabled={!isUpcoming(booking.start_date)}
              key={booking.id}
            >
              <ListItemIcon>
                {isUpcoming(booking.start_date) ? (
                  <CarRentalIcon />
                ) : (
                  <NoCrashIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`${booking.car} - ${booking.car_model} - ${booking.car_model_year} - ${booking.car_color}`}
                secondary={`${booking.start_date} - ${booking.end_date}`}
              />
              <Chip
                label={isUpcoming(booking.start_date) ? 'Upcoming' : 'Past'}
              />
            </ListItem>
          ))
        ) : (
          <h3>No bookings found</h3>
        )}
      </List>
      <Snackbar open={error} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errMessage}
        </Alert>
      </Snackbar>
    </StyledBookings>
  );
};

export default Bookings;
