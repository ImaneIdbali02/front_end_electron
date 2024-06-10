import React, { CSSProperties, SetStateAction } from 'react';
import BackButton from 'components/BackButton';
import PolesComponent from 'components/Pole'; // Renommez ici pour éviter le conflit
import CustomComponent from '@/components/AdminToolbar';
import Pole from 'components/Pole';
import { Link } from 'react-router-dom'; 


interface Pole {
  id_pole: number;
  nom: string;
  createdAt: string;
}

const Operations: React.FC = () => {
  const titleStyle: CSSProperties = {
    textAlign: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6a93af',
    marginTop:'5px',
    marginLeft: '20px',
  };
 
  const [Poles, setPoles] = React.useState<Pole[]>([]);

  return (
    <>
      <div style={{ marginTop: '-100px' }}><CustomComponent /></div>
      <div style={{ marginTop: '5px' }}><BackButton /></div>
      <div style={{ ...titleStyle, marginTop: ' 5px' }}>Poles</div>
      <div style={{ marginTop: '-30px' }}>
        <PolesComponent poles={Poles} setPoles={setPoles} />
      </div>
    </>
  );
};

export default Operations;
