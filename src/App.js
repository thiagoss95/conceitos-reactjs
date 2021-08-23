import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  //Preparação do componente para exibição em tela
  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>


      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(1)}> Remover </button>
            </li>
          )
        }

        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
