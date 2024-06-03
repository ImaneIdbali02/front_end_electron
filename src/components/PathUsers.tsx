import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

export default function IconBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
          onClick={(event) => handleNavigation(event, '/')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Accueil
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <Typography
              key={to}
              sx={{ display: 'flex', alignItems: 'center' }}
              color={last ? 'text.primary' : 'inherit'}
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {value}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
