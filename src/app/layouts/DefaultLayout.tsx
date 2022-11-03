import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useDispatch } from 'react-redux';
import { actions } from 'app/pages/HomePage/slice';
import { useTheme } from '@mui/material/styles';

import { StyledDrawer, StyledHeading, StyledBoxIcon } from './styles';
import LanguageSwitcher from 'app/components/LanguageSwitcher';
import i18next from 'i18next';

interface Props {
  children: React.ReactNode;
  sidebarMenuItems?: [];
  drawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const drawerWidth = 50;

const DefaultLayout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  React.useEffect(() => {
    if (isLg) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLg]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    if (checked) {
      dispatch(actions.showAvailableCars());
    } else {
      dispatch(actions.getCars());
    }
  }, [checked, dispatch]);

  const handleSearch = e => {
    setSearch(e.target.value);
    if (e.target.value.length > 3) {
      dispatch(actions.searchCars(e.target.value));
    }
    if (e.target.value.length === 0) {
      dispatch(actions.getCars());
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StyledDrawer
        variant="permanent"
        open={open}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          flexShrink: { sm: 0, width: 50 },
          backgroundColor: '#f5f5f5',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <StyledBoxIcon>
                  <TimeToLeaveIcon />
                </StyledBoxIcon>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{ margin: '20px auto', display: 'flex' }}
                component="span"
              >
                <HomeIcon />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            paddingLeft: { xs: 2, lg: '32px' },
            width: { sm: `calc(100% - ${drawerWidth - 30}px)` },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <StyledHeading>
                {!isLg && (
                  <>
                    {open ? (
                      <MenuOpenIcon onClick={() => setOpen(!open)} />
                    ) : (
                      <MenuIcon onClick={() => setOpen(!open)} />
                    )}
                  </>
                )}
                {i18next.t('APP_TITLE') as string}
              </StyledHeading>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={i18next.t('SHOW_AVAILABLE_CARS') as string}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} lg={3}>
              <TextField
                id="outlined-basic"
                label={i18next.t('SEARCH_BY_BRAND') as string}
                variant="outlined"
                value={search}
                onChange={handleSearch}
                sx={{
                  width: '90%',
                  marginTop: { xs: '-10px', lg: '20px' },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LanguageSwitcher />
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            paddingLeft: { xs: 2, lg: '24px' },
            paddingRight: { xs: 4 },
            width: { sm: `calc(100% - ${drawerWidth - 30}px)` },
          }}
        >
          {children}
        </Grid>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
