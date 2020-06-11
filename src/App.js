import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newProject = {
      title: `Novo Projeto ${Date.now()}`,
      url: "www.google.com",
      techs: ["node", "ReactJs"],
    };
    const response = await api.post("repositories", newProject);
    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if ((response.status = 202)) {
      const localProjects = projects.filter((project) => project.id !== id);
      setProjects(localProjects);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
