import React, { CSSProperties } from 'react';
import Tabm from 'components/TabMem';
import BackButton from 'components/BackButton';
import AddButton from 'components/AddButton';
import CustomComponent from 'components/AdminToolbar'; 

const Membres: React.FC = () => {

    const titleStyle: CSSProperties = {
        textAlign: 'left',
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '60px',
        marginLeft: '20px',
        color: '#6a93af',
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-60px' , width:'100%' }}>
                <CustomComponent />
            </div>

            {/* BackButton */}
            <div style={{ marginTop: '-40px' }}>
                <BackButton />
            </div>

            {/* AddButton */}
            <div style={{ position: 'absolute', top: '15px', right: '10px' }}>
               <AddButton title={'ajouter un membre'} />
            </div>

            {/* Membres title */}
            <div style={titleStyle}>Membres</div>

            {/* Tabm */}
            <div style={{ position: 'relative', top: '70px'}}>
                <Tabm />
            </div>
        </div>
    );
};

export default Membres;
