import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8080/api/users',// Base URL de l'API
});
const polesApi = axios.create({
  baseURL: 'http://localhost:8080/api/poles', // Base URL for the poles API
});

const projetsApi = axios.create({
  baseURL: 'http://localhost:8080/api/projets', // Base URL for the projets API
});

const villesApi = axios.create({
  baseURL: 'http://localhost:8080/api/villes', // Base URL for the projets API
});

export  default { usersApi, polesApi, projetsApi, villesApi };


