// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Tasks from "./pages/Tasks";
// import People from "./pages/People";
// import Projects from "./pages/Projects";

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const handleLogin = () => {
//     setToken(localStorage.getItem("token"));
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route
//           path="/*"
//           element={
//             token ? (
//               <>
//                 <Navbar />
//                 <Routes>
//                   <Route path="/tasks" element={<Tasks />} />
//                   <Route path="/people" element={<People />} />
//                   <Route path="/projects" element={<Projects />} />
//                   <Route path="*" element={<Navigate to="/tasks" />} />
//                 </Routes>
//               </>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import People from "./pages/People";
import Projects from "./pages/Projects";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
  };

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        {token ? (
          <>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/people" element={<People />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
