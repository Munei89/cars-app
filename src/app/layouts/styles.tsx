import styled from 'styled-components/macro';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export const StyledDrawer = styled(Drawer)<{ open: boolean; $islg?: boolean }>`
  &.MuiDrawer-docked {
    -webkit-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    -moz-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    -o-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    width: ${({ open }) => (open ? '280px' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    position: ${({ $islg }) => ($islg ? 'relative' : 'fixed')};
  }

  .MuiDrawer-paper {
    padding: 48px 0 0 48px;
    background: #fffbf7;
    border: 0px;
    -webkit-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    -moz-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    -o-transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    width: ${({ open }) => (open ? '280px' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    position: ${({ $islg }) => ($islg ? 'relative' : 'fixed')};

    .MuiList-root {
      padding-top: 0;
      padding-bottom: 0;
    }

    .MuiListItem-root,
    .MuiListItemButton-root {
      padding-left: 0;
      padding-bottom: 12px;
    }
    .MuiListItemIcon-root {
      min-width: 36px;
    }
  }
`;

export const StyledMenuText = styled('p')`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #000000;
  margin-left: 12px;
  margin-bottom: 0;
  margin-top: 0;
`;

export const StyledAppBar = styled(AppBar)`
  background: #fffbf7;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
  &.MuiAppBar-root {
    background: #fff;
    padding: 16px 0;
  }
`;

export const StyledBoxIcon = styled(Box)`
  background: red;
  padding: 16px 0px;
  width: 60px;
  color: #fff;
  border-radius: 10%;
  text-align: center;
  margin-bottom: 10px;
  margin-top: -24px;
  margin-left: auto;
  margin-right: auto;
`;
