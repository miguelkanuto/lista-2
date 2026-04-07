import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_PROJECTS } from "../graphql/queries";
import { CREATE_PROJECT, DELETE_PROJECT } from "../graphql/mutations";

export default function Projects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data, loading, refetch } = useQuery(GET_PROJECTS);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleCreate = async () => {
    if (!name) return;
    await createProject({ variables: { name, description } });
    setName("");
    setDescription("");
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteProject({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Listas de Compras</h2>
      <div
        className="card form"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <input
          placeholder="Nome da lista"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Adicionar
        </button>
      </div>
      <div className="list">
        {data?.getAllProjects.map((project) => (
          <div className="list-item" key={project.id}>
            <span>
              {project.name}{" "}
              {project.description ? `— ${project.description}` : ""}
            </span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(project.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
