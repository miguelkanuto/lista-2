import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_PEOPLE } from "../graphql/queries";
import { CREATE_PERSON, DELETE_PERSON } from "../graphql/mutations";

export default function People() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { data, loading, refetch } = useQuery(GET_PEOPLE);
  const [createPerson] = useMutation(CREATE_PERSON);
  const [deletePerson] = useMutation(DELETE_PERSON);

  const handleCreate = async () => {
    if (!name) return;
    await createPerson({
      variables: { name, age: age ? parseInt(age) : null },
    });
    setName("");
    setAge("");
    refetch();
  };

  const handleDelete = async (id) => {
    await deletePerson({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Pessoas</h2>
      <div
        className="card form"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Idade"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Adicionar
        </button>
      </div>
      <div className="list">
        {data?.getAllPeople.map((person) => (
          <div className="list-item" key={person.id}>
            <span>
              {person.name} {person.age ? `— ${person.age} anos` : ""}
            </span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(person.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
