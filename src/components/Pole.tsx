import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5d8aa8',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '& .MuiSvgIcon-root': {
    verticalAlign: 'middle', // Alignement vertical de l'icône avec le texte
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FolderIconWrapper = styled(FolderIcon)(({ theme }) => ({
  color: '#8faec3', // Change la couleur de l'icône de dossier
}));

const initialRows = [
  { id: 1, name: 'Pole 1', date: '2024-05-01' },
  { id: 2, name: 'Pole 2', date: '2024-05-02' },
];

export default function CustomizedTables() {
  const [rows, setRows] = React.useState(initialRows);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({ id: 0, name: '' });

  const handleEditClick = (id: number, name: string) => {
    setSelectedRow({ id, name });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
    // Logique de sauvegarde des modifications
    setOpenDialog(false);
  };

  const handleDeleteClick = (id: number) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce pole ?');
    if (confirmed) {
      // Logique de suppression
      setRows(rows.filter(row => row.id !== id));
    }
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell align="right">Date de Modifications</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <FolderIconWrapper /> {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditClick(row.id, row.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Modifier le nom</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            value={selectedRow.name}
            onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button onClick={handleSaveChanges}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
