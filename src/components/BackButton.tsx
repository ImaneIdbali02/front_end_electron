import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Retourne à la page précédente dans l'historique
    };

    return (
        <IconButton onClick={handleGoBack} color="primary">
            <ArrowBackIcon style={{ color: '#5D8AA8' }} />
        </IconButton>
    );
};

export default BackButton;
