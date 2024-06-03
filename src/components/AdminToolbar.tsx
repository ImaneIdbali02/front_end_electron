import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import { AccountCircle, CalendarToday } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import PathUser from 'components/PathUsers'; // Importez votre composant personnalisé

const CustomCalendar: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
};

const barAdmin: React.FC = () => {
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  };

  const handleOpenCalendarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget);
  };

  const handleCloseCalendarMenu = () => {
    setCalendarAnchorEl(null);
  };

  return (
    <Box bgcolor="#d3dee7" p={1} borderRadius={4} display="flex" alignItems="center" justifyContent="space-between">
      {/* Positionnez votre composant personnalisé ici */}
      <PathUser />
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleOpenUserMenu} style={{ marginRight: '10px' }}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={userAnchorEl}
          open={Boolean(userAnchorEl)}
          onClose={handleCloseUserMenu}
          style={{ marginLeft: '10px' }}
        >
          <MenuItem onClick={handleCloseUserMenu}>Déconnexion</MenuItem>
        </Menu>
        <IconButton onClick={handleOpenCalendarMenu} style={{ marginLeft: '10px' }}>
          <CalendarToday />
        </IconButton>
        <Menu
          anchorEl={calendarAnchorEl}
          open={Boolean(calendarAnchorEl)}
          onClose={handleCloseCalendarMenu}
        >
          <MenuItem>
            <CustomCalendar />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

  export default barAdmin ;
