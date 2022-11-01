import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

import {
  StyledDrawer,
  StyledMenuText,
  StyledAppBar,
  StyledBoxIcon,
} from './styles';

interface Props {
  children: React.ReactNode;
  sidebarMenuItems?: [];
  drawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const drawerWidth = 280;

const DefaultLayout = ({ children, drawerOpen }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer
        variant="permanent"
        open={true}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          flexShrink: { sm: 0, width: drawerWidth },
          backgroundColor: '#fffbf7',
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
                <p>RentACar</p>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
              }}
            >
              <List>
                <Box
                  sx={{ minWidth: '36px', display: 'flex' }}
                  component="span"
                >
                  <HomeIcon />
                  <StyledMenuText>Cars Home</StyledMenuText>
                </Box>
              </List>
            </Grid>
          </Grid>
        </Box>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <StyledAppBar
          position="static"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth - 20}px)` },
            ml: { sm: `${drawerWidth - 20}px` },
            backgroundColor: '#fff',
            color: '#000000',
            boxShadow: 'none',
            marginTop: '0',
            textAlign: 'center',
            padding: '0',
          }}
        >
          <Box>Home</Box>
        </StyledAppBar>
        <Grid container>{children}</Grid>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
