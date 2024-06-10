
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjetTable from 'components/tabprojet'; 
import Path from 'components/ToolBarProjet';
import BackButton from '@/components/BackButton';
import { CSSProperties } from '@mui/material/styles/createTypography';

const PageProjet = () => {
  const { pole_id } = useParams();
   console.log('ID du pôle reçu:', pole_id);
  // Convertir pole_id en nombre, gérer les cas d'erreur
  const poleIdNumber = pole_id ? parseInt(pole_id, 10) : null;
  if (poleIdNumber === null || isNaN(poleIdNumber)) {
    // Afficher un message d'erreur ou rediriger
    return <p>ID de pôle invalide. Veuillez vérifier l'URL.</p>;
  }

  const titleStyle: CSSProperties = {
    textAlign: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6a93af',
    marginTop:'5px',
    marginLeft: '20px',
  };
  return (
    <div>
      <div style={{ marginTop: '-100px' }} ><Path /></div>
      <BackButton />
      <div style={{ ...titleStyle, marginTop: ' 5px' }}>Projets</div>
      <div style={{ marginTop: '-30px' }}><ProjetTable pole_id={poleIdNumber} /></div>
    </div>
  );
};

export default PageProjet;

