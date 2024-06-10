import React from 'react';
import BackButton from 'components/BackButton';
import Form from 'components/Form';
const AddUser: React.FC = () => {
  

  return (
    <>
    <div style={{ marginTop: '-90px', marginLeft :' -10px'}} >
      <BackButton/>
      </div>
      <div>
      <Form />
    </div>
   </>
  );
};

export default AddUser;

