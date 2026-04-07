import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_TASKS } from "../graphql/queries";
import { CREATE_TASK, DELETE_TASK } from "../graphql/mutations";

export default function Tasks() {
  const [titulo, setTitulo] = useState("");
  const { data, loading, refetch } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleCreate = async () => {
    if (!titulo) return;
    await createTask({ variables: { titulo } });
    setTitulo("");
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Tarefas</h2>
      <div
        className="card form"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <input
          placeholder="Nova tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Adicionar
        </button>
      </div>
      <div className="list">
        {data?.getTasks.map((task) => (
          <div className="list-item" key={task.id}>
            <span>
              {task.titulo} {task.finished ? "✅" : "⬜"}
            </span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(task.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
