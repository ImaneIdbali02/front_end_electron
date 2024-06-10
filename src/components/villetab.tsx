import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Theme, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../api'; // Import du module API
import { CSSProperties } from '@mui/material/styles/createTypography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5d8aa8',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '& .MuiSvgIcon-root': {
    verticalAlign: 'middle',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Ville {
  createur_id: number;
  id_ville: number;
  nom: string;
  createdAt: string;
  projet_id: number;
  responsable: number;
}

interface VilleTableProps {
  projet_id: number;
}

const addButtonStyle: CSSProperties = {
  margin: '16px 0px',
  backgroundColor: '#5d8aa8', // Couleur correspondant à celle du tableau
  color: '#ffffff', // Couleur du texte en blanc
  float: 'right' // Ajout pour aligner le bouton à droite
};

export default function VilleTable({ projet_id }: VilleTableProps) {
  const [villes, setVilles] = React.useState<Ville[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [nomVille, setNomVille] = React.useState('');
  const [createurId, setCreateurId] = React.useState('');
  const [responsableId, setResponsableId] = React.useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [selectedVilleId, setSelectedVilleId] = React.useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editNomVille, setEditNomVille] = React.useState('');

  React.useEffect(() => {
    const fetchVilles = async () => {
      try {
        const response = await api.villesApi.get(`/${projet_id}`);
        setVilles(response.data);
      } catch (error) {
        console.error('Error fetching villes:', error);
      }
    };

    fetchVilles();
  }, [projet_id]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddVilleSubmit = async () => {
    const newVille = {
      nom: nomVille,
      createur_id: createurId,
      responsable: responsableId
    };

    try {
      const response = await api.villesApi.post(`/${projet_id}`, newVille);
      handleCloseDialog();
      setVilles((prevVilles) => [...prevVilles, response.data]);
    } catch (error) {
      console.error('Error adding ville:', error);
    }
  };

  const handleDelete = (id_ville: number) => {
    setSelectedVilleId(id_ville);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedVilleId) {
      try {
        await api.villesApi.delete(`/${selectedVilleId}`);
        setVilles((prevVilles) => prevVilles.filter((ville) => ville.id_ville !== selectedVilleId));
        setDeleteConfirmationOpen(false);
      } catch (error) {
        console.error('Error deleting ville:', error);
      }
    }
  };

  const handleEditClick = (ville: Ville) => {
    setSelectedVilleId(ville.id_ville);
    setEditNomVille(ville.nom);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSubmit = async () => {
    if (selectedVilleId) {
      try {
        const updatedVille = { nom: editNomVille };
        const response = await api.villesApi.put(`/${selectedVilleId}`, updatedVille);
        setVilles((prevVilles) =>
          prevVilles.map((ville) =>
            ville.id_ville === selectedVilleId ? { ...ville, nom: response.data.nom } : ville
          )
        );
        handleEditClose();
      } catch (error) {
        console.error('Error updating ville:', error);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={addButtonStyle}>
        Ajouter
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une nouvelle ville</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom de la ville"
            fullWidth
            value={nomVille}
            onChange={(e) => setNomVille(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ID du créateur"
            fullWidth
            value={createurId}
            onChange={(e) => setCreateurId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ID du responsable"
            fullWidth
            value={responsableId}
            onChange={(e) => setResponsableId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleAddVilleSubmit}>Ajouter</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Modifier le nom de la ville</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom de la ville"
            fullWidth
            value={editNomVille}
            onChange={(e) => setEditNomVille(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Annuler</Button>
          <Button onClick={handleEditSubmit}>Modifier</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette ville ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteConfirm} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Villes</StyledTableCell>
              <StyledTableCell align="right">Date de création</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {villes.map((ville) => (
              <StyledTableRow key={ville.id_ville}>
                <StyledTableCell component="th" scope="row">
                  {ville.nom}
                </StyledTableCell>
                <StyledTableCell align="right">{new Date(ville.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditClick(ville)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(ville.id_ville)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
