import React, { CSSProperties } from 'react';
import BackButton from 'components/BackButton';
import FolderList from 'components/Pole';
import CustomComponent from '@/components/AdminToolbar';

const Operations: React.FC = () => {
  const titleStyle: CSSProperties = {
    textAlign: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6a93af',
    marginTop: '20px', // Ajustement de la marge supérieure pour le titre
    marginLeft: '20px', // Ajustement de la marge gauche pour le titre
  };

  return (
    <>
      <div style={{ marginTop: '-100px' }}><CustomComponent /></div>

       <div style={{ marginTop: '5px' }}>
        <BackButton />
       </div>       {/* Ajustement de la marge supérieure pour le bouton de retour */}

      <div style={titleStyle}>Poles</div>

      <div style={{ marginTop: '15px' }}> {/* Ajustement de la marge supérieure pour la liste de dossiers */}
        <FolderList />
      </div>
    </>
  );
};

export default Operations;
