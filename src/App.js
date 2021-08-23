import React, { useState, useEffect } from "react";
import Header from './components/Header';
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  //Preparação do componente para exibição em tela
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: `https://github.com/thiagoss95/${Date.now()}`,
      techs: ["Javascript", "ReactJS"],
    });

    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //Removendo o repositório desejado utilizando o filter
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <Header title="Meus repositórios"/>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}> 
              <span>{repository.title}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
