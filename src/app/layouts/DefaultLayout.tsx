import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useDispatch } from 'react-redux';
import { actions } from 'app/pages/HomePage/slice';

import { StyledDrawer, StyledHeading, StyledBoxIcon } from './styles';

interface Props {
  children: React.ReactNode;
  sidebarMenuItems?: [];
  drawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const drawerWidth = 50;

const DefaultLayout = ({ children, drawerOpen }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
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
            Car rental home
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
              label="Show only available cars"
            />
          </FormGroup>
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
