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
import StyledSnackbar from 'app/components/StyledSnackbar';
import i18next from 'i18next';

interface IProps {
  handleFilter: (filters: any) => void;
  handleCancelFilter: () => void;
  bookings: IBooking[];
}

const Bookings = ({ handleFilter, bookings, handleCancelFilter }: IProps) => {
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = React.useState<any>({
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const isUpcoming = date => {
    const today = new Date();
    const bookingDate = new Date(date);
    return bookingDate > today;
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const onFilterSubmit = () => {
    const { fromDate, toDate } = filters;
    if (new Date(fromDate) > new Date(toDate)) {
      setError(true);
      setErrMessage(i18next.t('DATE_RANGE_ERROR'));
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
    <StyledBookings data-testid="bookings">
      <StyledHeadingWrapper>
        <h1>{i18next.t('BOOKINGS') as string}</h1>
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
        <h3>{i18next.t('FILTER_BY_DATE') as string}</h3>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label={i18next.t('START_DATE') as string}
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
            label={i18next.t('END_DATE') as string}
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
            {i18next.t('FILTER') as string}
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
            {i18next.t('CANCEL') as string}
          </StyledButton>
        </LocalizationProvider>
      </Popover>
      <List>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <ListItem
              disabled={!isUpcoming(booking.start_date)}
              key={booking.id}
              data-testid="booking-list"
            >
              <ListItemIcon>
                {isUpcoming(booking.start_date) ? (
                  <CarRentalIcon
                    sx={{
                      fill: `${booking.car_color}`,
                    }}
                  />
                ) : (
                  <NoCrashIcon
                    sx={{
                      fill: `${booking.car_color}`,
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`${booking.car} - ${booking.car_model} - ${booking.car_model_year} - ${booking.car_color}`}
                secondary={`${booking.start_date} - ${booking.end_date}`}
              />
              <Chip
                label={
                  isUpcoming(booking.start_date)
                    ? `${i18next.t('UPCOMING') as string}`
                    : `${i18next.t('PAST') as string}`
                }
              />
            </ListItem>
          ))
        ) : (
          <h3>{i18next.t('NO_BOOKINGS') as string}</h3>
        )}
      </List>
      <StyledSnackbar
        open={error}
        autoHideDuration={6000}
        message={errMessage}
        severity="error"
        handleClose={() => setError(false)}
      />
    </StyledBookings>
  );
};

export default Bookings;
