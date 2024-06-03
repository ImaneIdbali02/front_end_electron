import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const projects: string[] = ['Project 1', 'Project 2', 'Project 3'];
const userTypes: string[] = ['Admin', 'Membre', 'Visiteur'];

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D8AA8',
    },
    secondary: {
      main: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#5D8AA8',
            },
            '&:hover fieldset': {
              borderColor: '#5D8AA8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5D8AA8',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#5D8AA8',
          },
          '& .MuiInputBase-input': {
            color: '#5D8AA8',
          },
        },
      },
    },
  },
});

export default function FormPropsTextFields() {
  const [password, setPassword] = React.useState('');
  const [selectedProject, setSelectedProject] = React.useState('');
  const [selectedUserType, setSelectedUserType] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleProjectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProject(event.target.value as string);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUserType(event.target.value as string);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Place your submission logic here
    console.log('Utilisateur est bien ajouté!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          maxWidth: '500px',
          margin: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#5D8AA8' }}>
          Formulaire d'inscription
        </Typography>
        <TextField
          required
          id="outlined-required-nom"
          label="Nom"
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id="outlined-required-prenom"
          label="Prénom"
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <TextField
          id="outlined-phone-input"
          label="Numéro de téléphone"
          type="tel"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                +212
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id="outlined-id-input"
          label="ID"
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <TextField
          id="outlined-project-input"
          label="Project"
          select
          value={selectedProject}
          onChange={handleProjectChange}
          variant="outlined"
          sx={{ width: '100%' }}
        >
          {projects.map((project) => (
            <MenuItem key={project} value={project}>
              {project}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-user-type"
          label="Type d'utilisateur"
          select
          value={selectedUserType}
          onChange={handleUserTypeChange}
          variant="outlined"
          sx={{ width: '100%' }}
        >
          {userTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-password-input"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} size="small">
                  {showPassword ? <VisibilityOff sx={{ color: '#5D8AA8', fontSize: '20px' }} /> : <Visibility sx={{ color: '#5D8AA8', fontSize: '20px' }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ width: '100%' }}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%', backgroundColor: '#5D8AA8', color: '#fff', '&:hover': { backgroundColor: '#417089' } }}>
          Ajouter
        </Button>
      </Box>
    </ThemeProvider>
  );
}
