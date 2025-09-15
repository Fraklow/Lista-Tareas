import './App.css'
import Card from "react-bootstrap/Card"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { useState } from "react"

function App() {
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()

    if (tarea.trim() === "") return

    if (editIndex !== null) {
      const nuevasTareas = [...tareas]
      nuevasTareas[editIndex] = tarea
      setTareas(nuevasTareas)
      setEditIndex(null)
    } else {
      setTareas([...tareas, tarea])
    }

    setTarea("")
  }

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index)
    setTareas(nuevasTareas)
  }

  const editarTarea = (index) => {
    setTarea(tareas[index])
    setEditIndex(index)
  }

  return (
    <>
      <Card style={{ width: "30rem", textAlign: "center" }}>
        <h1>Lista de tareas</h1>
      </Card>
      <Card style={{ width: "30rem" }}>
        <Card>
          <Form onSubmit={agregarTarea}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Nueva tarea"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
              />
              <Button variant="success" type="submit">{editIndex !== null ? "Actualizar" : "Agregar"}</Button>
            </InputGroup>
          </Form>
        </Card>
        <Card>
          <h4>Tareas</h4>
          <ListGroup>
            <Form.Check type="checkbox"/>
            {tareas.map((t, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">{t}
                <div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => editarTarea(index)}
                  >
                    Editar
                  </Button> 
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => eliminarTarea(index)}
                  >
                    Eliminar
                  </Button> 
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Card>
    </>
  )
}

export default App
