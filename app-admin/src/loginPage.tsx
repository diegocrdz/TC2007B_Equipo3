import { useState } from "react"; 
import { useLogin, useNotify } from "react-admin";  // Se importan hooks de react-admin para el manejo de login y notificaciones.

export const LoginPage = () => {
  const login = useLogin(); // Para llamar a la función de login del authProvider
  const notify = useNotify(); // Para mostrar notificaciones
  const [username, setUsername] = useState(""); // Para establecer el nombre de usuario
  const [password, setPassword] = useState(""); // Para establecer la contraseña

    const handleSubmit = (e: React.FormEvent) => { // Maneja el evento de envío del formulario
    e.preventDefault();
    login({ username, password })
      .catch(() => notify("Credenciales inválidas", { type: "error" }));
  };
  // Se puede añadir estilo CSS aquí o importar un archivo CSS externo indicando los campos del formulario con sus respectivos elementos semanticos.
  return (
    <form onSubmit={handleSubmit}> 
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Usuario</label>
        <input // Sección de entrada para el nombre de usuario
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /> 
      </div>
      <div>
        <label>Contraseña</label>
        <input // Sección de entrada para la contraseña
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};
