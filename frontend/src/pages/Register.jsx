import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [register] = useMutation(REGISTER);

  const handleSubmit = async () => {
    try {
      await register({ variables: { email, password } });
      setSuccess("Conta criada com sucesso! Faça login.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Erro ao criar conta. Tente outro email.");
    }
  };

  return (
    <div className="center">
      <div className="card form">
        <h2 style={{ textAlign: "center" }}>Criar Conta</h2>
        {error && <p className="error">{error}</p>}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
        )}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Criar Conta
        </button>
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={onRegister}
        >
          Já tem conta? <span style={{ color: "#4CAF50" }}>Entrar</span>
        </p>
      </div>
    </div>
  );
}
