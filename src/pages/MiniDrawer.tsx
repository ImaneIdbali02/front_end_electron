import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import Acceuil from 'pages/Acceuil';
import Finances from 'pages/Finances';
import Membres from 'pages/Membres';
import Visiteur from 'pages/Visiteur'; 
import AddUser from 'pages/AddUser';
import Operations from 'pages/Operation';
import ProjetsAdmin from 'pages/projets';
import Ville from 'pages/villes';
import Projets from 'pages/projets';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SearchBox = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff',
    },
  },
  '& .MuiInputAdornment-root:hover': {
    transform: 'scale(1.05)', // Increase size of the search icon on hover
    cursor: 'pointer', // Change cursor to pointer on hover
  },
}));

// Define an array of icons for each list item
const listIcons = [HomeIcon, GroupIcon, AttachMoneyIcon, AccountCircleIcon, BusinessIcon, WorkIcon];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [utilisateursOpen, setUtilisateursOpen] = React.useState(false);
  const [operationOpen, setOperationOpen] = React.useState(false); // New state variable for 'Opération'

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUtilisateursToggle = () => {
    setUtilisateursOpen(!utilisateursOpen);
  }

 // Définissez l'état initial des pôles et une fonction pour les mettre à jour



  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#EEF3F6', width: '100%', overflow: 'auto' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: '#5D8AA8' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DocKeep
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <SearchBox
              placeholder="Search..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Acceuil', 'Utilisateurs', 'Finance', 'Ressources Humaines', 'Partenaires', 'Operation'].map((text, index) => (
              <React.Fragment key={text}>
                {text === 'Utilisateurs' ? (
                  <React.Fragment>
                    <ListItem disablePadding onClick={handleUtilisateursToggle}>
                      <ListItemButton>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        <ListItemIcon>
                          {utilisateursOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={utilisateursOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component={Link} to="utilisateurs/membres">
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="Membres" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component={Link} to="utilisateurs/visiteur">
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="Visiteurs" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <ListItem disablePadding sx={{ minHeight: 48 }}>
                    <Link to={text === 'Acceuil' ? '/' : `/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <ListItemButton sx={{ width: '100%' }}>
                        <ListItemIcon>
                          {React.createElement(listIcons[index % listIcons.length])}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ) }
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Acceuil />} />
              <Route path="/finance" element={<Finances />} />
              <Route path="/utilisateurs/visiteur" element={<Visiteur />} />
              <Route path="/pages/AddUser" element={<AddUser />} />
              <Route path="/utilisateurs/membres" element={<Membres />} />
              <Route path="/Operation" element={<Operations />} />
             
              <Route path="Operation/projets/:pole_id" element={<ProjetsAdmin />} />
              <Route path="/Operation/projets/villes/:projet_id" element={<Ville />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}
