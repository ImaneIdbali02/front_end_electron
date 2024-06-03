import React from 'react';
import TabDm from '@/components/tabDm';
import AddButton from 'components/AddButton';
import CustomComponent from '@/components/AdminToolbar';

const Acceuil: React.FC = () => {
    return (
        <div style={{ position: 'relative'}}>
            <div style={{ position: 'absolute', top: '-100px' , width:'100%' }}>
                <CustomComponent/>
            </div>
            <div style={{ position: 'absolute', top: '-25px', right: '10px' }}>
               <AddButton title={'Ajouter un utilisateur'} />
            </div>
            <div style={{ position: 'relative', top: '40px'}}>
            <TabDm />
            </div>
            
           
            
        </div>
    );
};

export default Acceuil;
