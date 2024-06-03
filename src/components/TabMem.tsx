import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { TableSortLabel } from '@mui/material';

interface Column {
  id: 'nom' | 'prenom' | 'email' | 'connexionRecente' | 'modification';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'nom', label: 'Nom', minWidth: 100 },
  { id: 'prenom', label: 'Prénom', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'connexionRecente',
    label: 'Connexion Récente',
    minWidth: 100,
    align: 'right',
    format: (value: string) => new Date(value).toLocaleString('fr-FR'),
  },
  { id: 'modification', label: 'Modification', minWidth: 100, align: 'right' },
];

interface Data {
  nom: string;
  prenom: string;
  email: string;
  connexionRecente: string;
  modification: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D8AA8',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuRow, setMenuRow] = React.useState<null | Data>(null);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('nom');

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    // Remplacez cette partie par votre appel API pour récupérer les données
    const fetchData = async () => {
      const data = [
        { nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', connexionRecente: '2024-05-15T12:30:00', modification: '' },
        { nom: 'Martin', prenom: 'Sophie', email: 'sophie.martin@example.com', connexionRecente: '2024-05-14T15:45:00', modification: '' },
        { nom: 'Bernard', prenom: 'Luc', email: 'luc.bernard@example.com', connexionRecente: '2024-05-13T08:20:00', modification: '' },
        { nom: 'Petit', prenom: 'Claire', email: 'claire.petit@example.com', connexionRecente: '2024-05-12T11:00:00', modification: '' },
        { nom: 'Robert', prenom: 'Nicolas', email: 'nicolas.robert@example.com', connexionRecente: '2024-05-11T17:15:00', modification: '' },
      ];
      setRows(data);
    };

    fetchData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row: Data) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator<Key extends keyof any>(
    order: 'asc' | 'desc',
    orderBy: Key,
  ): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<Key extends keyof any>(
    a: { [key in Key]: any },
    b: { [key in Key]: any },
    orderBy: Key,
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleEdit = () => {
    // Logique de modification
    console.log('Modifier', menuRow);
    handleClose();
  };

  const handleDelete = () => {
    // Logique de suppression
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
    if (confirmation) {
      setRows((prevRows) => prevRows.filter((row) => row !== menuRow));
    }
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: isSmallScreen ? 50 : column.minWidth, backgroundColor: '#5D8AA8', color: '#ffffff' }}
                  >
                    {column.id !== 'modification' ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={(event) => handleRequestSort(event, column.id)}
                        sx={{ color: '#ffffff' }}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'modification') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) => handleClick(event, row)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleEdit}>Modifier</MenuItem>
                              <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
                            </Menu>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'string' ? column.format(value) : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': {
              color: '#000000',
            },
          }}
        />
      </Paper>
    </ThemeProvider>
  );
}
