import { useEffect, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [tareas, setTareas] = useState("");
  const [listaTareas, setListaTareas] = useState([]);
  const [editarTarea, setEditarTarea] = useState(null);
  const [tareasGuardadas, setTareasGuardadas] = useState([]); // Estado para tareas guardadas

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/juancruz", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("Error en la respuesta");
        }

        return resp.json();
      })
      .then((data) => {
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
  };

  const createTarea = (tarea) => {
    fetch("https://playground.4geeks.com/todo/todos/juancruz", {
      method: "POST",
      body: JSON.stringify({
        label: tareas,
        is_done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())

      .then((data) => {
        console.log(data);
        getTareas();
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
  };

  //Get Tareas

  const getTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/juancruz", {
      method: "GET",
     
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("Error en la respuesta");
        }

        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then((data) => {
        setListaTareas(data.todos);
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
  };

  // Delete tarea

  const deleteTarea = (id) => {
    fetch("https://playground.4geeks.com/todo/todos/" + id, {
      method: "DELETE",
      //body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("Error en la respuesta");
        }

        return true; 
      })
      .then((data) => {
       getTareas();
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      createTarea();
    }
  };

  useEffect(() => {
    createUser();
    getTareas();
  }, []);

  return (
    <>
      <h1>Tareas Pendientes</h1>

      <div className="input-group mb-3" id="group">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese tarea"
          id="inputG"
          value={tareas}
          onChange={(e) => setTareas(e.target.value)}
          onKeyPress={pressEnter}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={createTarea}
        >
          Add
        </button>
      </div>

      <div className="container">
        <ul className="list-group">
          {listaTareas.length === 0 ? (
            <li className="list-group-item" style={{ color: "#ec7744" }}>
              No hay tareas pendientes
            </li>
          ) : (
            listaTareas.map((tarea) => (
              <li className="list-group-item" key={tarea.id} id="input">
                {tarea.label}
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{
                    marginRight: "10px",
                    color: "#ec7744",
                    cursor: "pointer",
                  }}
                  onClick={() => iniciarEdicion(id)}
                />
                <FontAwesomeIcon
                  icon={tareasGuardadas[tarea.id] ? faLockOpen : faLock}
                  style={{
                    marginLeft: "10px",
                    color: "#ec7744",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleGuardarTarea(tarea.id)}
                />
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "#ec7744",
                  }}
                  onClick={() => deleteTarea(tarea.id)}
                  id="span"
                >
                  X
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
