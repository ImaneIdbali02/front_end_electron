
import BasicTable from 'components/villetab';
import IconBreadcrumb from 'components/Villetoolbar';
import BackButton from 'components/BackButton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { CSSProperties } from '@mui/material/styles/createTypography';


const Ville: React.FC = () => {
    const { projet_id } = useParams<{ projet_id: string }>();
    const titleStyle: CSSProperties = {
        textAlign: 'left',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#6a93af',
        marginTop:'5px',
        marginLeft: '20px',
      };
    return (
        <>
             <div style={{ marginTop: '-100px' }}><IconBreadcrumb /></div>
             <div><BackButton /></div>
            <div style={{ ...titleStyle, marginTop: ' 5px' }}>Villes</div>
           <div style={{ marginTop: '-30px' }}><BasicTable projet_id={Number(projet_id)} /></div>    
           
        
        </>
    );
};

export default Ville;