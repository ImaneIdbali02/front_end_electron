import React from 'react';
import TabDm from '@/componenetsvis/tabdmvis';
import CustomComponent from '../components/AdminToolbar';

const Acceuil: React.FC = () => {
    return (
        <div style={{ position: 'relative'}}>
            <div style={{ top: '-300px', width: '100%' }}>
                <CustomComponent />
            </div>
            <div style={{ position: 'relative', top: '100px' }}>
                <TabDm />
            </div>
        </div>
    );
};

export default Acceuil;
