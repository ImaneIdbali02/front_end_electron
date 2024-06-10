import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
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
        {pathnames.slice(0, 2).map((value, index) => {
          const last = index === pathnames.length - 1 || index === 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const decodedValue = decodeURIComponent(value);

          return last ? (
            <Typography
              key={to}
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {decodedValue}
            </Typography>
          ) : (
            <Link
              key={to}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href={to}
              onClick={(event) => handleNavigation(event, to)}
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {decodedValue}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
