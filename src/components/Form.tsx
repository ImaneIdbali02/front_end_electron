import React, { useState } from 'react';
import { Button, Box, Snackbar, TextField, MenuItem, Typography, IconButton, InputAdornment, Select, OutlinedInput, Chip, FormControl, FormHelperText, InputLabel } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from '../api';

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
          '& .MuiInputLabel-root': {
            color: '#5D8AA8', // Couleur du texte du label
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre
            },
            '&:hover fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre lors du survol
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre lorsqu'il est en surbrillance
            },
          },
          '& .MuiInputBase-input': {
            color: '#5D8AA8', // Couleur du texte dans le champ de texte
          },
        },
      },
    },
    MuiFormControl: { // Ajout d'une surcharge de style pour MuiFormControl
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#5D8AA8', // Couleur du texte du label
            '&.Mui-focused': {
              color: '#5D8AA8', // Couleur du texte du label lorsqu'il est en surbrillance
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre
            },
            '&:hover fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre lors du survol
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5D8AA8', // Couleur du cadre lorsqu'il est en surbrillance
            },
          },
        },
      },
    },
  },
});


const projects = ['Project 1', 'Project 2', 'Project 3'];
const userTypes = ['Admin', 'Membre', 'Visiteur'];

export default function FormComponent() {
  const [password, setPassword] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    phone: '',
    email: '',
    id: '',
    userType: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    nom: false,
    prenom: false,
    phone: false,
    email: false,
    id: false,
    project: false,
    userType: false,
    password: false
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event: { target: { id: any; value: any; }; }) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  const handleProjectChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setSelectedProjects(typeof value === 'string' ? value.split(',') : value);
    setErrors((prevErrors) => ({ ...prevErrors, project: false }));
  };

  const handleProjectDelete = (projectToDelete: string) => {
    setSelectedProjects((prevProjects) => prevProjects.filter((project) => project !== projectToDelete));
  };

  const handleUserTypeChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setSelectedUserType(value);
    setFormData((prevData) => ({ ...prevData, userType: value }));
    setErrors((prevErrors) => ({ ...prevErrors, userType: false }));
  };

  const handlePasswordChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setPassword(value);
    setFormData((prevData) => ({ ...prevData, password: value }));
    setErrors((prevErrors) => ({ ...prevErrors, password: false }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    const newErrors = {
      nom: formData.nom.trim() === '',
      prenom: formData.prenom.trim() === '',
      phone: formData.phone.trim() === '',
      email: formData.email.trim() === '',
      id: formData.id.trim() === '',
      project: selectedProjects.length === 0,
      userType: formData.userType.trim() === '',
      password: formData.password.trim() === ''
    };

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every(isError => !isError);

    if (!isFormValid) {
      // If the form is not valid, do not proceed
      setSnackbarSeverity('error');
      setSnackbarMessage('Veuillez remplir tous les champs requis.');
      setSnackbarOpen(true);
      return;
    }

    // If the form is valid, proceed with submission
    try {
      const user = {
        id_username: formData.id,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        poste: selectedProjects,
        droit_acces: formData.userType,
        telephone: formData.phone
      };
      await api.usersApi.post('/ajoutUtilisateur', user);
      setSnackbarSeverity('success');
      setSnackbarMessage('Utilisateur ajouté avec succès !');
      setSnackbarOpen(true);
      
      // Reset the form after successful submission
      setFormData({
        nom: '',
        prenom: '',
        phone: '',
        email: '',
        id: '',
        userType: '',
        password: ''
      });
      setSelectedProjects([]);
      setSelectedUserType('');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Erreur lors de l\'ajout de l\'utilisateur.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          Ajouter un utilisateur
        </Typography>
        <TextField
          required
          id="nom"
          label="Nom"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={handleChange}
          value={formData.nom}
          error={errors.nom}
          helperText={errors.nom && 'Nom requis'}
        />
        <TextField
          required
          id="prenom"
          label="Prénom"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={handleChange}
          value={formData.prenom}
          error={errors.prenom}
          helperText={errors.prenom && 'Prénom requis'}
        />
        <TextField
          required
          id="phone"
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
          onChange={handleChange}
          value={formData.phone}
          error={errors.phone}
          helperText={errors.phone && 'Numéro de téléphone requis'}
        />
        <TextField
          required
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={handleChange}
          value={formData.email}
          error={errors.email}
          helperText={errors.email && 'Email requis'}
        />
        <TextField
          required
          id="id"
          label="ID"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={handleChange}
          value={formData.id}
          error={errors.id}
          helperText={errors.id && 'ID requis'}
        />
        <FormControl sx={{ width: '100%' }} error={errors.project}>
  <InputLabel id="project-label">Projet</InputLabel>
  <Select
    required
    labelId="project-label" // Utilisation de labelId pour lier l'InputLabel au Select
    id="project"
    multiple
    value={selectedProjects}
    onChange={handleProjectChange}
    input={<OutlinedInput label="Projet" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleProjectDelete(value)}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          />
        ))}
      </Box>
    )}
    variant="outlined"
    sx={{ width: '100%' }}
  >
    {projects.map((project) => (
      <MenuItem key={project} value={project}>
        {project}
      </MenuItem>
    ))}
  </Select>
  {errors.project && <FormHelperText>Projet requis</FormHelperText>}
</FormControl>

        <TextField
          required
          id="userType"
          label="Type d'utilisateur"
          select
          value={selectedUserType}
          onChange={handleUserTypeChange}
          variant="outlined"
          sx={{ width: '100%' }}
          error={errors.userType}
          helperText={errors.userType && 'Type d\'utilisateur requis'}
        >
          {userTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={handlePasswordChange}
          value={formData.password}
          error={errors.password}
          helperText={errors.password && 'Mot de passe requis'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          S'inscrire
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}