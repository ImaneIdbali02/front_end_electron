import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import api from '../api';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
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

const FolderIconWrapper = styled(FolderIcon)({
  color: '#8faec3',
});

const addButtonStyle: CSSProperties = {
  margin: '16px 0px',
  backgroundColor: '#5d8aa8', // Couleur correspondant à celle du tableau
  color: '#ffffff', // Couleur du texte en blanc
};

interface Projet {
  id_projet: number;
  nom: string;
  chef_projet: string;
  createdAt: string;
  pole_id: number;
}

interface ProjetTableProps {
  pole_id: number;
}

const ProjetTable: React.FC<ProjetTableProps> = ({ pole_id }) => {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [nomProjet, setNomProjet] = useState('');
  const [chefProjetId, setChefProjetId] = useState('');
  const [createurId, setCreateurId] = useState('');
  const [currentProjet, setCurrentProjet] = useState<Projet | null>(null);
  const [newProjetName, setNewProjetName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.projetsApi.get(`/${pole_id}`)
      .then(response => setProjets(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, [pole_id]);

  const handleAddProject = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddProjectSubmit = () => {
    const newProjet = {
      nom: nomProjet,
      chef_projet: chefProjetId,
      createur_id: createurId,
    };

    api.projetsApi.post(`/${pole_id}`, newProjet)
      .then(response => {
        setProjets([...projets, response.data]);
        setOpenDialog(false);
      })
      .catch(error => console.error('Error adding project:', error));
  };

  const handleDeleteClick = (projet: Projet) => {
    setCurrentProjet(projet);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (currentProjet && currentProjet.id_projet) {
      api.projetsApi.delete(`/${currentProjet.id_projet}`)
        .then(() => {
          setProjets(projets.filter(p => p.id_projet !== currentProjet.id_projet));
          setOpenDeleteDialog(false);
          setCurrentProjet(null);
        })
        .catch(error => console.error('Error deleting project:', error));
    }
  };

  const handleEditClick = (projet: Projet) => {
    setCurrentProjet(projet);
    setNewProjetName(projet.nom);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = () => {
    if (currentProjet && currentProjet.id_projet && newProjetName.trim() !== '') {
      const updatedProjet = { ...currentProjet, nom: newProjetName.trim() };
      api.projetsApi.put(`/${currentProjet.id_projet}`, updatedProjet)
        .then(() => {
          // Update the projets state with the modified project
          setProjets(projets.map(p => (p.id_projet === currentProjet.id_projet ? updatedProjet : p)));
          setOpenEditDialog(false);
          setCurrentProjet(null);
        })
        .catch(error => console.error('Error updating project:', error));
    }
  };
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}> 
        <Button variant="contained" onClick={handleAddProject} style={addButtonStyle}>Ajouter</Button>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter un projet</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom du projet"
            fullWidth
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ID du chef de projet"
            fullWidth
            value={chefProjetId}
            onChange={(e) => setChefProjetId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ID du créateur"
            fullWidth
            value={createurId}
            onChange={(e) => setCreateurId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleAddProjectSubmit}>Ajouter</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
  <DialogTitle>Confirmer la suppression</DialogTitle>
  <DialogContent>
    Êtes-vous sûr de vouloir supprimer le projet "{currentProjet?.nom}" ?
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>
    <Button onClick={handleDeleteConfirm} color="error">Supprimer</Button>
  </DialogActions>
</Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier le nom du projet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newProjetName"
            label="Nouveau nom du projet"
            type="text"
            fullWidth
            value={newProjetName}
            onChange={(e) => setNewProjetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell align="right">Chef de projet</StyledTableCell>
              <StyledTableCell align="right">Date et Heure d'ajout</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projets.map((projet) => (
              <StyledTableRow key={projet.id_projet}>
                <StyledTableCell component="th" scope="row">
                <Link
                   to={`/Operation/projets/villes/${projet.id_projet}`}
                   style={{
                    color: 'black',
                   textDecoration: 'none',
                   cursor: 'pointer',
                               }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'darkblue'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                    >
                   <FolderIconWrapper /> {projet.nom}
                   </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{projet.chef_projet}</StyledTableCell>

                <StyledTableCell align="right">{new Date(projet.createdAt).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditClick(projet)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(projet)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjetTable;