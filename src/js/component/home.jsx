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
        console.log(data); 
      })
      .catch((error) => {
        
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
        setTareas("")
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
        console.log(data); 
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

  const clearAll = () => {

    if(listaTareas.length=== 0){
      alert("No hay tareas para eliminar!")
    }

    listaTareas.forEach((tarea)=>{

    fetch (`https://playground.4geeks.com/todo/todos/${tarea.id}`,{
      method: "DELETE",
      headers: {"Content-Type": "aplication/json",       
      },

    })
    .then((resp)=>{
      if(!resp.ok){
        console.log("Error en la respuesta");
      }
      return resp.json()
    })

    .then((data)=>{
      console.log(data);
      setListaTareas([]);
    })
  
    .catch((error) =>{
      console.log(error);
    })

  })
    
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

      <div className="clear">
        <button className="btn" style={{backgroundColor:"#ec7744", color: "#8edf5f"}} onClick={clearAll}>Clear All</button>
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
                <div className="right-icons">
                
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
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
