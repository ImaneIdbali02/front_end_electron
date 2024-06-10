import React, { useEffect, useState } from 'react';
import api from '../api';

const MyComponent: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/Utilisateurs');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id_username}>{user.nom} {user.prenom} {user.id_username}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
