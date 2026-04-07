import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>
        <NavLink to="/tasks">Tarefas</NavLink>
        <NavLink to="/people">Pessoas</NavLink>
        <NavLink to="/projects">Listas</NavLink>
      </div>
      <button className="btn btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
