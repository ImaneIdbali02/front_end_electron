import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('pages/AddUser');
  };

  return (
    <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
            sx={{ 
                backgroundImage: 'linear-gradient(to right, #5d8aa8, #4b6e90)',
                '&:hover': { backgroundImage: 'linear-gradient(to right, #4b6e90, #5d8aa8)' }
            }}
        >
            Ajouter
        </Button>
  );
};

export default AddButton;

