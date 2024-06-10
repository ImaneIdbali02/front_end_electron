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
import api from '../api';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { Link } from 'react-router-dom';




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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FolderIconWrapper = styled(FolderIcon)(({ }) => ({
  color: '#8faec3',
}));

interface Pole {
  id_pole: number;
  nom: string;
  createdAt: string;
}





interface PolesComponentProps { // Renommez ici pour éviter le conflit
  poles: Pole[];
  setPoles: React.Dispatch<React.SetStateAction<Pole[]>>;
}
const addButtonStyle: CSSProperties = {
  margin: '16px 0px',
  backgroundColor: '#5d8aa8', // Couleur correspondant à celle du tableau
  color: '#ffffff', // Couleur du texte en blanc
};

const Poles = ({ poles, setPoles }: PolesComponentProps) => {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedPole, setSelectedPole] = React.useState<Pole | null>(null);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [poleData, setPoleData] = React.useState({ nom: '', createur_id: '', id_pole: 0 });
  const [newPoleName, setNewPoleName] = React.useState('');

   
  React.useEffect(() => {
    api.polesApi.get('/Poles')
      .then(response => {
        if (Array.isArray(response.data)) {
          console.log('Pôles chargés:', response.data);
          setPoles(response.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau :', response.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des pôles :', error);
      });
  }, [setPoles]);



  const handleEditClick = (pole: Pole) => {
    setSelectedPole(pole);
    setNewPoleName(pole.nom); // Pré-remplit le champ de saisie avec le nom du pôle actuel
    setOpenEditDialog(true);
  };

  const handleEditPole = () => {
    if (selectedPole && selectedPole.id_pole && newPoleName.trim() !== '') {
      const updatedPole = { ...selectedPole, nom: newPoleName.trim() };
      api.polesApi.put(`/${selectedPole.id_pole}`, updatedPole)
        .then(() => {
          // Met à jour la liste des pôles dans le composant et ferme la boîte de dialogue
          setPoles(poles.map(pole => (pole.id_pole === selectedPole.id_pole ? updatedPole : pole)));
          setOpenEditDialog(false);
        })
        .catch(error => {
          console.error('Erreur lors de la modification du pôle :', error);
        });
    } else {
      console.error('Nom de pôle invalide ou aucun pôle sélectionné.');
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = (pole: Pole) => {
    console.log('Pôle sélectionné pour suppression:', pole);
    setSelectedPole(pole);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true); // Ouvrir le dialogue d'ajout lorsque le bouton est cliqué
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false); // Fermer le dialogue d'ajout
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoleData({ ...poleData, [name]: value });
  };

  const handleAddPole = () => {
    api.polesApi.post('/ajoutPole', poleData)
      .then(response => {
        console.log('Pôle ajouté avec succès :', response.data);
        setOpenAddDialog(false);
        // Mettre à jour la liste des pôles avec le nouveau pôle ajouté
        setPoles([...poles, response.data]);
        setPoleData({ nom: '', createur_id: '', id_pole: 0 });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du pôle :', error);
      });
  };

  const handleDelete = () => {
    if (selectedPole && selectedPole.id_pole) { // Vérifiez si selectedPole et son ID sont définis
      console.log('ID du pôle à supprimer:', selectedPole.id_pole);
      api.polesApi.delete(`/${selectedPole.id_pole}`)
        .then(() => {
          setPoles(poles.filter(pole => pole.id_pole !== selectedPole.id_pole));
          setOpenDeleteDialog(false);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du pôle :', error);
        });
    } else {
      console.error('Aucun pôle sélectionné pour suppression ou ID non défini.');
    }
  };
  const formattedCreatedAt = (dateString: string) => {
    const createdAtDate = new Date(dateString);
    return createdAtDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  

  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" onClick={handleAddClick} style={addButtonStyle}>
        Ajouter 
      </Button>
      </div>

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
            {Array.isArray(poles) ? poles.map((pole) => (
              <StyledTableRow key={pole.id_pole}>
                <StyledTableCell component="th" scope="row">
                
                <Link
                   to={`/Operation/projets/${pole.id_pole}`}
                   style={{
                    color: 'black',
                   textDecoration: 'none',
                   cursor: 'pointer',
                               }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'darkblue'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                    >
                   <FolderIconWrapper /> {pole.nom}
                   </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{formattedCreatedAt(pole.createdAt)}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditClick(pole)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(pole)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            )) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  Aucun pôle trouvé.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogue d'ajout */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Ajouter un pôle</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="nom"
            name="nom"
            label="Nom du pôle"
            type="text"
            fullWidth
            value={poleData.nom}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="createur_id"
            name="createur_id"
            label="ID du créateur"
            type="text"
            fullWidth
            value={poleData.createur_id}
            onChange={handleInputChange}
          />
          {/* Ajoutez d'autres champs ici si nécessaire */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Annuler</Button>
          <Button onClick={handleAddPole} variant="contained" color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue de suppression */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Supprimer le pôle</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer le pôle "{selectedPole?.nom}" ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Annuler</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>

       {/* Dialogue de modification */}
       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Modifier le nom du pôle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newPoleName"
            label="Nouveau nom du pôle"
            type="text"
            fullWidth
            value={newPoleName}
            onChange={(e) => setNewPoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Annuler</Button>
          <Button onClick={handleEditPole} variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </>
    
  );
};

export default Poles;
