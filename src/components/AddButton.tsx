import React from 'react';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

interface AddButtonProps {
  title: string;
  titleStyle?: React.CSSProperties;
}
const AddButton : React.FC<AddButtonProps> = ({ title, titleStyle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
     navigate('/pages/AddUser');
  };

  return (
    <Button   variant="contained"
              onClick={handleClick} 
              color="primary"
              sx={{
              backgroundColor: '#82a4bc',
             '&:hover': { backgroundColor: '#82a4bc' },
             ...titleStyle,
          }}>
     <PersonAddIcon />
    </Button>
  );
};

export default AddButton;
