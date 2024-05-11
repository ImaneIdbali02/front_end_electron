
import React from 'react';
import Tab from 'components/tab'; // Assurez-vous que le chemin d'importation est correct
import AddButton from '@/components/AddButton';

const Acceuil: React.FC = () => {
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-70px', right: '10px' }}>
                <AddButton />
            </div>
            <Tab /> {/* Utilisation du composant Tab ici */}
        </div>
    );
};

export default Acceuil;




