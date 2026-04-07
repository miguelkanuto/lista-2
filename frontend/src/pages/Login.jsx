// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { LOGIN } from "../graphql/mutations";

// export default function Login({ onLogin, onRegister }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const [login] = useMutation(LOGIN);

//   const handleSubmit = async () => {
//     try {
//       const { data } = await login({ variables: { email, password } });
//       localStorage.setItem("token", data.login);
//       onLogin();
//     } catch (err) {
//       setError("Email ou senha incorretos");
//     }
//   };

//   return (
//     <div className="center">
//       <div className="card form">
//         <h2 style={{ textAlign: "center" }}>Login</h2>
//         {error && <p className="error">{error}</p>}
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           placeholder="Senha"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Entrar
//         </button>
//         <p
//           style={{ textAlign: "center", cursor: "pointer" }}
//           onClick={onRegister}
//         >
//           Não tem conta? <span style={{ color: "#4CAF50" }}>Criar conta</span>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);

  const handleSubmit = async () => {
    try {
      const { data } = await login({
        variables: { email, password },
      });

      localStorage.setItem("token", data.login);
      onLogin();

      navigate("/tasks"); // redireciona após login
    } catch (err) {
      console.error(err);
      setError("Email ou senha incorretos");
    }
  };

  return (
    <div className="center">
      <div className="card form">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && <p className="error">{error}</p>}

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
          Entrar
        </button>

        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Não tem conta? <span style={{ color: "#4CAF50" }}>Criar conta</span>
        </p>
      </div>
    </div>
  );
}
