import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('repositories');
        setRepositories(res.data);
      } catch (error) {
        console.log('can not load respositories');
      }
    }
    fetchData();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New Rep: ${Date.now()}`,
      url: 'http://wwww.teste.com.br',
      techs: ['react', 'nodejs'],
    };

    const res = await api.post('repositories', newRepository);
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
          <li key={repository.id}>
                    {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
